import fs from 'fs';
import { Octokit } from '@octokit/rest';
import { request } from '@octokit/request';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const projectId = process.env.PROJECT_ID;

const issues = JSON.parse(fs.readFileSync('.github/issues.json', 'utf8'));

async function addIssueLink(subjectId, objectId, linkType = "PARENT") {
  try {
    await request('POST /graphql', {
      headers: { authorization: `token ${GITHUB_TOKEN}` },
      query: `
        mutation AddIssueLink($input: AddIssueLinkInput!) {
          addIssueLink(input: $input) {
            issueLink {
              id
            }
          }
        }
      `,
      input: {
        subjectId,
        objectId,
        linkType
      }
    });
    console.log(`Linked issue ${objectId} as ${linkType} to ${subjectId}`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('Link already exists');
    } else {
      console.error('Failed to create link:', error.message);
    }
  }
}

async function run() {
  // Fetch milestones once and map title -> id
  const milestonesResponse = await octokit.issues.listMilestones({
    owner,
    repo,
    state: 'open',
    per_page: 100,
  });
  const milestoneMap = {};
  for (const m of milestonesResponse.data) {
    milestoneMap[m.title] = m.number; // milestone ID is `number` here for REST API
  }
  
  // Map your local issue IDs to GitHub issue data (number and node_id)
  const localToGitHub = {};
  
  for (const issue of issues) {
    // Check if issue exists already
    const { data: existingIssues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: 100,
    });
    
    let found = existingIssues.find(i => i.title === issue.title);
    let issueNumber, issueNodeId;
    
    // Resolve milestone number from title
    let milestoneNumber = undefined;
    if (issue.milestone) {
      milestoneNumber = milestoneMap[issue.milestone];
      if (!milestoneNumber) {
        console.warn(`Warning: Milestone "${issue.milestone}" not found for issue "${issue.title}"`);
      }
    }
    
    if (found) {
      issueNumber = found.number;
      issueNodeId = found.node_id;
      console.log(`Updating issue #${issueNumber}: ${issue.title}`);
      await octokit.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        body: issue.body,
        labels: issue.labels,
        assignees: issue.assignees,
        milestone: milestoneNumber, // assign milestone by number or undefined
      });
    } else {
      const newIssue = await octokit.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
        assignees: issue.assignees,
        milestone: milestoneNumber,
      });
      issueNumber = newIssue.data.number;
      issueNodeId = newIssue.data.node_id;
      console.log(`Created new issue #${issueNumber}: ${issue.title}`);
    }
    
    localToGitHub[issue.id] = { number: issueNumber, node_id: issueNodeId };
    
    // Add to project
    try {
      await request(
        `POST /graphql`,
        {
          headers: { authorization: `token ${GITHUB_TOKEN}` },
          query: `
            mutation($projectId: ID!, $issueId: ID!) {
              addProjectV2ItemById(input: {projectId: $projectId, contentId: $issueId}) {
                item { id }
              }
            }
          `,
          projectId,
          issueId: issueNodeId
        }
      );
      console.log(`Added issue #${issueNumber} to project.`);
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log(`Issue #${issueNumber} is already in the project.`);
      } else {
        console.error(`Failed to add issue #${issueNumber} to project:`, err.message);
      }
    }
    
    // Handle sub-issues (with milestone same logic)
    if (issue.sub_issue && issue.sub_issue.length) {
      for (const sub of issue.sub_issue) {
        let subFound = existingIssues.find(i => i.title === sub.title);
        let subNumber, subNodeId;
        
        // Resolve milestone number for sub-issue
        let subMilestoneNumber = undefined;
        if (sub.milestone) {
          subMilestoneNumber = milestoneMap[sub.milestone];
          if (!subMilestoneNumber) {
            console.warn(`Warning: Milestone "${sub.milestone}" not found for sub-issue "${sub.title}"`);
          }
        }
        
        if (subFound) {
          subNumber = subFound.number;
          subNodeId = subFound.node_id;
          await octokit.issues.update({
            owner,
            repo,
            issue_number: subNumber,
            body: sub.body + `\n\nThis task is a sub-issue of #${issueNumber}.`,
            labels: sub.labels,
            assignees: sub.assignees,
            milestone: subMilestoneNumber,
          });
          console.log(`Updated sub-issue #${subNumber}: ${sub.title}`);
        } else {
          const newSub = await octokit.issues.create({
            owner,
            repo,
            title: sub.title,
            body: sub.body + `\n\nThis task is a sub-issue of #${issueNumber}.`,
            labels: sub.labels,
            assignees: sub.assignees,
            milestone: subMilestoneNumber,
          });
          subNumber = newSub.data.number;
          subNodeId = newSub.data.node_id;
          console.log(`Created sub-issue #${subNumber}: ${sub.title}`);
        }
        
        localToGitHub[sub.id] = { number: subNumber, node_id: subNodeId };
        
        // Link sub-issue explicitly to main issue
        await addIssueLink(issueNodeId, subNodeId, "CHILD");
        
        // Add sub-issue to project
        try {
          await request(
            `POST /graphql`,
            {
              headers: { authorization: `token ${GITHUB_TOKEN}` },
              query: `
                mutation($projectId: ID!, $issueId: ID!) {
                  addProjectV2ItemById(input: {projectId: $projectId, contentId: $issueId}) {
                    item { id }
                  }
                }
              `,
              projectId,
              issueId: subNodeId
            }
          );
          console.log(`Added sub-issue #${subNumber} to project.`);
        } catch (err) {
          if (err.message.includes('already exists')) {
            console.log(`Sub-issue #${subNumber} is already in the project.`);
          } else {
            console.error(`Failed to add sub-issue #${subNumber} to project:`, err.message);
          }
        }
      }
    }
  }
}

run().catch(console.error);

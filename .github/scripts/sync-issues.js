import fs from 'fs';
import { Octokit } from '@octokit/rest';
import { request } from '@octokit/request';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const projectId = process.env.PROJECT_ID;

const issues = JSON.parse(fs.readFileSync('.github/issues.json', 'utf8'));

// Helper: Make markdown link to an issue
function makeIssueLink(number, title) {
  return `[#${number} ${title}](https://github.com/${owner}/${repo}/issues/${number})`;
}

// Helper: Append or replace Relationships section in the body
function appendRelationshipsSection(body, relatedLinks) {
  // Remove existing Relationships section (if any)
  const bodyWithoutSection = body.replace(/## Relationships[\s\S]*$/m, '').trim();
  
  if (relatedLinks.length === 0) return bodyWithoutSection;
  
  const section = `

## Relationships
${relatedLinks.map(link => `- ${link}`).join('\n')}
`;
  
  return bodyWithoutSection + section;
}

// Helper: Create a GraphQL issue link (child/parent)
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

// Helper: Add issue to project board (ProjectV2)
async function addIssueToProject(projectId, issueNodeId, issueNumber) {
  try {
    await request('POST /graphql', {
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
    });
    console.log(`Added issue #${issueNumber} to project.`);
  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log(`Issue #${issueNumber} is already in the project.`);
    } else {
      console.error(`Failed to add issue #${issueNumber} to project:`, err.message);
    }
  }
}

async function run() {
  // Map local issue IDs to GitHub issue info (number, node_id)
  const localToGitHub = {};
  
  // Fetch all open issues once for title existence checks
  const { data: existingIssues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    per_page: 100,
  });
  
  for (const issue of issues) {
    const subIssues = issue.sub_issue || [];
    
    // Check if main issue exists by title
    let found = existingIssues.find(i => i.title === issue.title);
    let issueNumber, issueNodeId;
    
    if (found) {
      issueNumber = found.number;
      issueNodeId = found.node_id;
      console.log(`Found existing main issue #${issueNumber}: ${issue.title}`);
    }
    
    // Initially set main issue body (without Relationships, will update later)
    let mainBody = issue.body;
    
    if (!found) {
      // Create main issue
      const newIssue = await octokit.issues.create({
        owner,
        repo,
        title: issue.title,
        body: mainBody,
        labels: issue.labels,
        assignees: issue.assignees,
      });
      issueNumber = newIssue.data.number;
      issueNodeId = newIssue.data.node_id;
      console.log(`Created main issue #${issueNumber}: ${issue.title}`);
    } else {
      // Update main issue body (no Relationships yet)
      await octokit.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        body: mainBody,
        labels: issue.labels,
        assignees: issue.assignees,
      });
      console.log(`Updated main issue #${issueNumber}: ${issue.title}`);
    }
    
    localToGitHub[issue.id] = { number: issueNumber, node_id: issueNodeId };
    
    // Add main issue to project
    await addIssueToProject(projectId, issueNodeId, issueNumber);
    
    // Process sub-issues
    for (const sub of subIssues) {
      // Check if sub-issue exists
      let subFound = existingIssues.find(i => i.title === sub.title);
      let subNumber, subNodeId;
      
      if (subFound) {
        subNumber = subFound.number;
        subNodeId = subFound.node_id;
        console.log(`Found existing sub-issue #${subNumber}: ${sub.title}`);
      }
      
      // Compose sub-issue body with parent link and Relationships section
      let subBodyBase = sub.body + `

Parent issue: ${makeIssueLink(issueNumber, issue.title)}
`;
      
      subBodyBase = appendRelationshipsSection(subBodyBase, [
        `Parent: ${makeIssueLink(issueNumber, issue.title)}`
      ]);
      
      if (!subFound) {
        // Create sub-issue
        const newSub = await octokit.issues.create({
          owner,
          repo,
          title: sub.title,
          body: subBodyBase,
          labels: sub.labels,
          assignees: sub.assignees,
        });
        subNumber = newSub.data.number;
        subNodeId = newSub.data.node_id;
        console.log(`Created sub-issue #${subNumber}: ${sub.title}`);
      } else {
        // Update sub-issue
        await octokit.issues.update({
          owner,
          repo,
          issue_number: subNumber,
          body: subBodyBase,
          labels: sub.labels,
          assignees: sub.assignees,
        });
        console.log(`Updated sub-issue #${subNumber}: ${sub.title}`);
      }
      
      localToGitHub[sub.id] = { number: subNumber, node_id: subNodeId };
      
      // Link sub-issue explicitly to main issue (CHILD relation)
      await addIssueLink(issueNodeId, subNodeId, "CHILD");
      
      // Add sub-issue to project
      await addIssueToProject(projectId, subNodeId, subNumber);
    }
    
    // After all sub-issues processed, update main issue Relationships section
    if (subIssues.length) {
      const subLinks = subIssues.map(s => {
        const gh = localToGitHub[s.id];
        return makeIssueLink(gh.number, s.title);
      });
      const updatedBody = appendRelationshipsSection(issue.body, subLinks);
      
      if (updatedBody !== issue.body) {
        await octokit.issues.update({
          owner,
          repo,
          issue_number: issueNumber,
          body: updatedBody,
        });
        console.log(`Updated Relationships section in main issue #${issueNumber}`);
      }
    }
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

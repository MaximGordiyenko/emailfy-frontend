import fs from 'fs';
import { Octokit } from '@octokit/rest';
import { request } from '@octokit/request';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

const issues = JSON.parse(fs.readFileSync('.github/issues.json', 'utf8'));

// Cache for project name => project ID
const projectCache = new Map();

async function getProjectIdByName(projectName) {
  if (projectCache.has(projectName)) {
    return projectCache.get(projectName);
  }
  
  // List all user/org projects (v2) for the repo owner (assumes owner is org or user)
  // GitHub API: list projects under a repository
  // We use GraphQL API to get ProjectV2 info by name since REST doesn't list v2 projects easily.
  
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        projectsV2(first: 50) {
          nodes {
            id
            title
          }
        }
      }
    }
  `;
  
  const response = await request('POST /graphql', {
    headers: { authorization: `token ${GITHUB_TOKEN}` },
    query,
    owner,
    repo,
  });
  
  const projects = response.data.repository.projectsV2.nodes;
  const project = projects.find(p => p.title === projectName);
  if (!project) throw new Error(`Project with name "${projectName}" not found in repo ${owner}/${repo}`);
  
  projectCache.set(projectName, project.id);
  return project.id;
}

async function addIssueToProjects(issueNodeId, projectNames) {
  if (!projectNames) return;
  if (!Array.isArray(projectNames)) projectNames = [projectNames];
  
  for (const projectName of projectNames) {
    try {
      const projectId = await getProjectIdByName(projectName);
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
      console.log(`Added issue ${issueNodeId} to project "${projectName}".`);
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log(`Issue ${issueNodeId} is already in project "${projectName}".`);
      } else {
        console.error(`Failed to add issue ${issueNodeId} to project "${projectName}":`, err.message);
      }
    }
  }
}

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
  const localToGitHub = {};
  
  for (const issue of issues) {
    // Check existing open issues
    const { data: existingIssues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: 100,
    });
    
    let found = existingIssues.find(i => i.title === issue.title);
    let issueNumber, issueNodeId;
    
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
      });
    } else {
      const newIssue = await octokit.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
        assignees: issue.assignees,
      });
      issueNumber = newIssue.data.number;
      issueNodeId = newIssue.data.node_id;
      console.log(`Created new issue #${issueNumber}: ${issue.title}`);
    }
    
    localToGitHub[issue.id] = { number: issueNumber, node_id: issueNodeId };
    
    // Add issue to projects defined in issue.projects
    await addIssueToProjects(issueNodeId, issue.projects);
    
    // Process sub-issues
    if (issue.sub_issue && issue.sub_issue.length) {
      for (const sub of issue.sub_issue) {
        let subFound = existingIssues.find(i => i.title === sub.title);
        let subNumber, subNodeId;
        
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
          });
          subNumber = newSub.data.number;
          subNodeId = newSub.data.node_id;
          console.log(`Created sub-issue #${subNumber}: ${sub.title}`);
        }
        
        localToGitHub[sub.id] = { number: subNumber, node_id: subNodeId };
        
        // Link sub-issue explicitly to main issue (sub-issue is CHILD of main issue)
        await addIssueLink(issueNodeId, subNodeId, "CHILD");
        
        // Add sub-issue to projects if sub.projects exists, otherwise inherit parent projects
        await addIssueToProjects(subNodeId, sub.projects || issue.projects);
      }
    }
  }
}

run().catch(console.error);

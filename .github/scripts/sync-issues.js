import fs from 'fs';
import { Octokit } from '@octokit/rest';
import { request } from '@octokit/request';

const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function run() {
  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
  
  // Your project ID (replace with your real ID)
  const projectId = process.env.PROJECT_ID;
  
  // Load issues JSON
  const issues = JSON.parse(fs.readFileSync('.github/issues.json', 'utf8'));
  
  for (const issue of issues) {
    // Find existing open issue with same title
    const { data: existingIssues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: 100,
    });
    
    let found = existingIssues.find(i => i.title === issue.title);
    let issueNumber;
    
    if (found) {
      issueNumber = found.number;
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
      console.log(`Created new issue #${issueNumber}: ${issue.title}`);
    }
    
    // Add the issue as a card to the project (projectV2 API via GraphQL)
    try {
      await request(
        `POST /graphql`,
        {
          headers: { authorization: `token ${PERSONAL_ACCESS_TOKEN}` },
          query: `
            mutation($projectId: ID!, $issueId: ID!) {
              addProjectV2ItemById(input: {projectId: $projectId, contentId: $issueId}) {
                item {
                  id
                }
              }
            }
          `,
          projectId,
          issueId: found ? found.node_id : (await octokit.issues.get({
            owner,
            repo,
            issue_number: issueNumber
          })).data.node_id
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
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

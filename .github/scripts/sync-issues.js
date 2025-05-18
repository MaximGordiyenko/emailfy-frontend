const fs = require('fs');
const { Octokit } = require('@octokit/rest');

async function run() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
  
  // Load the JSON file
  const issues = JSON.parse(fs.readFileSync('issues.json', 'utf8'));
  
  for (const issue of issues) {
    // Search for existing open issues with the same title
    const { data: existingIssues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: 100,
    });
    
    const found = existingIssues.find(i => i.title === issue.title);
    
    if (found) {
      console.log(`Updating existing issue #${found.number}: ${issue.title}`);
      await octokit.issues.update({
        owner,
        repo,
        issue_number: found.number,
        body: issue.body,
        labels: issue.labels,
        assignees: issue.assignees,
      });
    } else {
      console.log(`Creating new issue: ${issue.title}`);
      await octokit.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
        assignees: issue.assignees,
      });
    }
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

// .github/scripts/create_issues.js
// Node.js script to create GitHub issues from a local JSON file

import fs from "fs";
import fetch from "node-fetch";

const GITHUB_TOKEN = process.env.GIT_TOKEN;
const REPO = process.env.GIT_REPOSITORY || "MaximGordiyenko/emailfy-frontend";
const API_URL = `https://api.github.com/repos/${REPO}/issues`;
const ISSUE_FILE = ".github/issues.json";

async function createIssue(issue) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify(issue),
  });
  
  if (res.ok) {
    console.log(`✅ Created issue: ${issue.title}`);
  } else {
    const error = await res.text();
    console.error(`❌ Failed to create issue: ${issue.title}`, error);
  }
}

function loadIssuesFromFile() {
  const content = fs.readFileSync(ISSUE_FILE, "utf8");
  return JSON.parse(content);
}

(async () => {
  try {
    const issues = loadIssuesFromFile();
    for (const issue of issues) {
      await createIssue(issue);
    }
  } catch (err) {
    console.error("❌ Error in issue creation:", err);
    process.exit(1);
  }
})();

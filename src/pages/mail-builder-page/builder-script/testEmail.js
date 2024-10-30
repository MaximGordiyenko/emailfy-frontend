import * as testApi from '../../../api/builder/builder_test';
import { getAccessToken } from '../../../api/auth/auth';

export async function sendTestEmail(emails, content_id = '00000000-0000-0000-0000-000000000000') {
  const access_token = await getAccessToken();
  const templateId = localStorage.getItem('current_template_id');
  try {
    const res = await testApi.send_test_email(access_token, templateId, content_id, emails);
    return res.status === 200;
  } catch (error) {
    return false;
  }
}

export async function getEmailSpamScore(content_id = '00000000-0000-0000-0000-000000000000') {
  const access_token = await getAccessToken();
  const templateId = localStorage.getItem('current_template_id');
  try {
    const res = await testApi.get_spam_score(access_token, templateId, content_id);
    return res.data.score;
  } catch (error) {
    return -1;
  }
}

export async function getEmailSize(content_id = '00000000-0000-0000-0000-000000000000') {
  const access_token = await getAccessToken();
  const templateId = localStorage.getItem('current_template_id');
  try {
    const res = await testApi.get_email_size(access_token, templateId, content_id);
    return res.data.size;
  } catch (error) {
    return -1;
  }
}

export function displayEmailSize(size) {
  if (size < 0) {
    return 'N/A';
  }
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

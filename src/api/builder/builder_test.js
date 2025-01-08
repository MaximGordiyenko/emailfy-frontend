import axios from 'axios';
import { extractIDFromVimeoUrl } from '../../helpers/extractIdFromVimeoUrl.js';

export async function get_spam_score(access_token, template_id, content_id) {
  return await axios.get(`/api/builder/${template_id}/test/${content_id}/spam-score`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function send_test_email(access_token, template_id, content_id, emails) {
  return await axios.post(
    `/api/builder/${template_id}/test/${content_id}/send-email`,
    {
      emails: emails,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function get_email_size(access_token, template_id, content_id) {
  return await axios.get(`/api/builder/${template_id}/test/${content_id}/email-size`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export const get_video_preview_image = async (url) => {
  if (!url) return null;
  try {
    const id = extractIDFromVimeoUrl(url);
    if (!id) return null;
    const response = await axios.get(`https://api.vimeo.com/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
    });

    // Extract the thumbnail URL from the Vimeo API response
    return response?.data?.pictures?.sizes[3]?.link;
  } catch (error) {
    console.error('Error:', error.response?.data || error);
    return null;
  }
};

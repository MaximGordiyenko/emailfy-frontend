import axios from 'axios';

export async function get_contents(access_token, template_id) {
  return await axios.get(`/api/builder/${template_id}/content/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_content(access_token, template_id, content_id, content) {
  return await axios.post(`/api/builder/${template_id}/content/${content_id}`, content, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_content(access_token, template_id, content_id) {
  return await axios.get(`/api/builder/${template_id}/content/${content_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

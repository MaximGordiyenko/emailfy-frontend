import axios from 'axios';

export async function get_script(access_token, template_id) {
  return await axios.get(`/api/builder/${template_id}/script`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_script(access_token, template_id, script) {
  return await axios.post(`/api/builder/${template_id}/script`, script, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

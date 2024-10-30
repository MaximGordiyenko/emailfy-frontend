import axios from 'axios';

export async function get_templates(access_token) {
  return await axios.get(`/api/builder/template/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function create_template(access_token, name, type) {
  return await axios.post(
    `/api/builder/template`,
    {
      name: name,
      editor_type: type,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function update_template(access_token, template_id, data) {
  return await axios.post(`/api/builder/${template_id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_template(access_token, template_id) {
  return await axios.get(`/api/builder/${template_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function delete_template(access_token, template_id) {
  return await axios.delete(`/api/builder/${template_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

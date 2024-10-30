import axios from 'axios';

export async function get_resources(access_token, template_id) {
  return await axios.get(`/api/builder/${template_id}/resource/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function add_resource(access_token, template_id, form_data, cid) {
  return await axios.post(`/api/builder/${template_id}/resource/create?cid=${cid}`, form_data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_resource(access_token, template_id, resource_id) {
  return await axios.get(`/api/builder/${template_id}/resource/${resource_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function delete_resource(access_token, template_id, resource_id) {
  return await axios.delete(`/api/builder/${template_id}/resource/${resource_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

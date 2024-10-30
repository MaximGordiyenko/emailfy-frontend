import axios from 'axios';

export async function start_segmentation(access_token, group_id, filter) {
  return await axios.post(`/api/segmentation/create/${group_id}`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_segmentation_list(access_token) {
  return await axios.get(`/api/segmentation/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_active_segmentation(access_token) {
  return await axios.get(`/api/segmentation/active`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_segmentation_process(access_token, segmentation_id) {
  return await axios.get(`/api/segmentation/${segmentation_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

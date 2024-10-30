import axios from 'axios';

export async function get_root(access_token) {
  return await axios.get(`/api/group/root`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function create(access_token, subgroup, icon, name, description) {
  return await axios.post(
    `/api/group/${subgroup}/create`,
    {
      icon: icon,
      name: name,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function get_group(access_token, group_id) {
  return await axios.get(`/api/group/${group_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function update(access_token, group_id, icon, name, description) {
  return await axios.post(
    `/api/group/${group_id}`,
    {
      icon: icon,
      name: name,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function remove(access_token, group_id) {
  return await axios.delete(`/api/group/${group_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_subgroups(access_token, group_id) {
  return await axios.get(`/api/group/${group_id}/subgroups`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function add_one_subscriber(access_token, group_id, subscriber) {
  return await axios.post(`/api/group/${group_id}/subscribers/one`, subscriber, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function add_list_subscribers(access_token, group_id, subscribers) {
  return await axios.post(`/api/group/${group_id}/subscribers/list`, subscribers, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_subscribers_count(access_token, group_id) {
  return await axios.get(`/api/group/${group_id}/subscribers/count`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_subscribers_list(access_token, group_id, skip_to_email, count) {
  return await axios.get(
    `/api/group/${group_id}/subscribers/list?limit=${count}&skip_to_email=${skip_to_email}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function remove_subscribers(access_token, group_id, emails) {
  return await axios.post(
    `/api/group/${group_id}/subscribers/remove`,
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

import axios from 'axios';

export async function check_admin(access_token) {
  return await axios.get(`/admin/check`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function give_role(access_token, email, role) {
  return await axios.post(
    `/admin/user/role`,
    {
      email: email,
      role: role,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function init_data(access_token) {
  return await axios.post(`/admin/data/init`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_servers_list(access_token) {
  return await axios.get(`/admin/servers/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function add_server(access_token, url) {
  return await axios.post(
    `/api/admin/servers/add`,
    {
      url: url,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function get_server(access_token, server_id) {
  return await axios.get(`/api/admin/servers/${server_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function remove_server(access_token, server_id) {
  return await axios.delete(`/api/admin/servers/${server_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function start_server(access_token, server_id) {
  return await axios.post(`/api/admin/servers/${server_id}/start`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function stop_server(access_token, server_id) {
  return await axios.post(`/api/admin/servers/${server_id}/stop`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

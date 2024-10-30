import axios from 'axios';

export async function start_import_csv(access_token, group_id, formData, csv_type) {
  return await axios.post(`/api/import-csv/create/${group_id}?csv_type=${csv_type}`, formData, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_import_csv_list(access_token) {
  return await axios.get(`/api/import-csv/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_active_import_csv(access_token) {
  return await axios.get(`/api/import-csv/active`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_import_csv_process(access_token, import_id) {
  return await axios.get(`/api/import-csv/${import_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_import_csv_errors(access_token, import_id) {
  return await axios.get(`/api/import-csv/${import_id}/errors`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

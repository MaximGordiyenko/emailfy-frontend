import axios from 'axios';

export async function timeload(access_token, from_time, to_time, parts_count, mocked) {
  if (mocked) {
    return Array.from({ length: parts_count }).map(() => Math.random());
  }
  return await axios.get(
    `/api/task/timeload?from_time=${from_time}&to_time=${to_time}&parts_count=${parts_count}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function get_available_slots(access_token, from_time, to_time, recipients) {
  return await axios.get(
    `/api/task/timeload?from_time=${from_time}&to_time=${to_time}&recipients=${recipients}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function create(access_token, task_info) {
  return await axios.post(`/api/task/create`, task_info, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function list(access_token) {
  return await axios.get(`/api/task/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_task(access_token, task_id) {
  return await axios.get(`/api/task/${task_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function remove_task(access_token, task_id) {
  return await axios.delete(`/api/task/${task_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

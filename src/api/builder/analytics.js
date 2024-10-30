import axios from 'axios';

export async function get_analytics(access_token, template_id) {
  return await axios.get(`/api/builder/${template_id}/analytics`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function add_link(access_token, template_id, block_id, url) {
  return await axios.post(
    `/api/builder/${template_id}/analytics/link?id=${block_id}`,
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

export async function set_open_tag(access_token, template_id, block_id) {
  return await axios.post(`/api/builder/${template_id}/analytics/open?id=${block_id}`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_subscribe_btn(access_token, template_id, block_id) {
  return await axios.post(`/api/builder/${template_id}/analytics/subscribe?id=${block_id}`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_unsubscribe_btn(access_token, template_id, block_id) {
  return await axios.post(
    `/api/builder/${template_id}/analytics/unsubscribe?id=${block_id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function set_spam_btn(access_token, template_id, block_id) {
  return await axios.post(`/api/builder/${template_id}/analytics/spam?id=${block_id}`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_survey_answer_btn(access_token, template_id, block_id, answer) {
  return await axios.post(
    `/api/builder/${template_id}/analytics/survey?id=${block_id}`,
    {
      answer: answer,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function delete_analytics(access_token, template_id, analytics_id) {
  return await axios.delete(`/api/builder/${template_id}/analytics/${analytics_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

import axios from 'axios';

export async function get_emails_statistics(access_token, filter) {
  return await axios.post(`/api/analytics/statistics/emails`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_subscribers_statistics(access_token, filter) {
  return await axios.post(`/api/analytics/statistics/subscribers`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_clicks_statistics(access_token, filter) {
  return await axios.post(`/api/analytics/statistics/clicks`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_events_statistics(access_token, filter) {
  return await axios.post(`/api/analytics/statistics/events`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_surveys_statistics(access_token, filter) {
  return await axios.post(`/api/analytics/statistics/surveys`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_subscriptions_statistics(access_token, filter) {
  return await axios.post(`/api/analytics/statistics/subscriptions`, filter, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_users_statistics(access_token) {
  return await axios.get(`/api/analytics/statistics/users`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

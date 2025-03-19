import axios from 'axios';
import { API } from '../API.js';

export const generateClientEmails = async () => {
  try {
    return await API.post(`/settings/user-info/client-emails`);
  } catch (error) {
    throw error;
  }
};

export const generateEmailCampaigns = async () => {
  try {
    return await API.post(`/settings/user-info/client-campaigns`);
  } catch (error) {
    throw error;
  }
};

export const generateEmailsStatistic = async () => {
  try {
    return await API.post(`/settings/user-info/client-statistic`);
  } catch (error) {
    throw error;
  }
};

export async function change_email(access_token, email) {
  return await axios.post(
    `/api/settings/email`,
    {
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function confirm_change_email(access_token, token) {
  return await axios.post(`/api/settings/confirm/change-email/${token}`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function confirm_unlink_email(access_token, token) {
  return await axios.post(`/api/settings/confirm/unlink-email/${token}`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function change_password(access_token, password) {
  return await axios.post(
    `/api/settings/password`,
    {
      password: password,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function confirm_reset_password(token, password) {
  return await axios.post(`/api/settings/password/confirm-reset/${token}`, {
    password: password,
  });
}

export async function reset_password(email) {
  return await axios.post(`/api/settings/password/reset`, {
    email: email,
  });
}

export async function set_smtp(access_token, smtpInfo) {
  return await axios.post(`/api/settings/smtp`, smtpInfo, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_smtp(access_token) {
  return await axios.get(`/api/settings/smtp`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function check_smtp(access_token) {
  return await axios.get(`/api/settings/smtp/check`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function delete_smtp(access_token) {
  return await axios.delete(`/api/settings/smtp`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_new_smtp(access_token) {
  return await axios.get(`/api/settings/smtp/new`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function get_auth(access_token) {
  return await axios.get(`/api/settings/auth`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_auth(access_token, authInfo) {
  return await axios.post(`/api/settings/auth`, authInfo, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

import axios from 'axios';
import { API, getToken, setToken } from '../API';

export const signUp = async ({ email, password, confirmPassword }) => {
  return await API.post(`/register`, {
    email,
    password,
    confirmPassword,
  });
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await API.post('/login', { email, password });
    const { accessToken } = response.data;
    return { accessToken };
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = getToken('refreshToken');
    const { data } = await API.post('/refresh', { token: refreshToken });
    const newAccessToken = data.accessToken;

    setToken('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token', error);
    throw new Error('Failed to refresh access token');
  }
};

export const signOut = async () => {
  await API.post(`/logout`, null);
};

export async function send_code(token_2fa) {
  return await axios.post(`/api/auth/send-code`, {
    token_2fa: token_2fa,
  });
}

export async function sign_2fa(token_2fa, code) {
  return await axios.post(`/api/auth/sign-2fa?code=${code}`, {
    token_2fa: token_2fa,
  });
}

export async function confirm_registration(token) {
  return await axios.get(`/api/auth/confirm-registration/${token}`);
}

export async function get_devices(access_token) {
  return await axios.get(`/api/auth/devices/list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function delete_device(access_token, device_id) {
  return await axios.delete(`/api/auth/devices/${device_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function check(access_token) {
  return await axios.get(`/api/auth/check`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

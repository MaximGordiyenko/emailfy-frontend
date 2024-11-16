import axios from 'axios';
import { API, getToken, setToken, removeToken } from '../API';

export const signUp = async ({ email, password, confirmPassword }) => {
  try {
    const {
      data: { message, userId },
    } = await API.post(`/register`, {
      email,
      password,
      confirmPassword,
    });
    return { message, userId };
  } catch (error) {
    throw error;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const {
      data: { message, accessToken, refreshToken },
    } = await API.post('/login', { email, password });
    return { message, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = getToken('refreshToken');

    const { data } = await API.post('/refresh', { token: refreshToken });
    setToken('accessToken', data.accessToken);

    if (data.refreshToken) setToken('refreshToken', data.refreshToken);

    return data.accessToken;
  } catch (error) {
    removeToken('accessToken');
    removeToken('refreshToken');
    window.location.href = '/login';
    console.error('Error refreshing token', error);
    throw error;
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

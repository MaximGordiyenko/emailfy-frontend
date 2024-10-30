import axios from 'axios';

export async function signup(login, password) {
  return await axios.post(`/api/auth/signup`, {
    login: login,
    password: password,
  });
}

export async function signin(login, password, remember) {
  return await axios.post(`/api/auth/signin`, {
    login: login,
    password: password,
    remember: remember,
  });
}

export async function signout(access_token) {
  return await axios.post(`/api/auth/signout`, null, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

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

export async function refresh_token(refresh_token) {
  return await axios.get(`/api/auth/refresh-token`, null, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
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

export function saveAccessToken(token) {
  localStorage.setItem('auth_token', JSON.stringify(token));
}

export function removeAccessToken() {
  localStorage.removeItem('auth_token');
}

export async function getAccessToken() {
  const auth_token = localStorage.getItem('auth_token');
  if (!auth_token) {
    return null;
  }
  const token = JSON.parse(auth_token);

  if (token.expires_in < Date.now() / 1000 + 60 * 5) {
    const req = await refresh_token(token.refresh_token);
    if (req.status !== 200) {
      return null;
    }
    const auth_token = req.data;
    if (!auth_token.refresh_token) {
      auth_token.refresh_token = token.refresh_token;
    }
    localStorage.setItem('auth_token', JSON.stringify(auth_token));
    return auth_token.access_token;
  }

  return token.access_token;
}

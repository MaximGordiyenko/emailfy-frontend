import axios from 'axios';
import { getToken, API } from '../API';

export const getCountries = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/settings/company/countries`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export async function get_company_info(access_token) {
  return await axios.get(`/api/settings/company-info`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function set_company_info(access_token, info) {
  return await axios.post(`/api/settings/company-info`, info, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function delete_company_info(access_token) {
  return await axios.delete(`/api/settings/company-info`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

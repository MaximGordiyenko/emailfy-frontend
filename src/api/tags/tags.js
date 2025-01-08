import { getToken, API } from '../API.js';

export const getEmailClientsData = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/tags/emailClientInfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTagsStatistic = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/tags/tagsStatistic`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

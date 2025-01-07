import { getToken, API } from './API';

export const getGroupAudienceList = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/audience/group_list`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

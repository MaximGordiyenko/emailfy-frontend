import * as userInfoAPI from '../api/settings/account.js';
import { getToken } from '../api/API.js';

export const getUserEmail = async (setter) => {
  try {
    const access_token = getToken('accessToken');
    const userInfo = await userInfoAPI.getUserInfo(access_token);
    setter('from_email', userInfo.data.email);
  } catch (error) {
    console.log('get user email:', error);
  }
};

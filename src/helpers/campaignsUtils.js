import * as userInfoAPI from '../api/settings/user_info';
import { getToken } from '../api/API';

export const getUserEmail = async (setter) => {
  try {
    const access_token = getToken('accessToken');
    const userInfo = await userInfoAPI.get_user_info(access_token);
    setter('from_email', userInfo.data.email);
  } catch (error) {
    console.log('get user email:', error);
  }
};

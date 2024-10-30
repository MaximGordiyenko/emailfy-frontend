import * as userInfoAPI from '../api/settings/user_info';
import { getAccessToken } from '../api/auth/auth';

export const getUserEmail = async (setter) => {
  try {
    const access_token = await getAccessToken();
    const userInfo = await userInfoAPI.get_user_info(access_token);
    setter('from_email', userInfo.data.email);
  } catch (error) {
    console.log('get user email:', error);
  }
};

import axios from 'axios';

export async function get_user_info(access_token) {
  return await axios.get(`/api/settings/user-info`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

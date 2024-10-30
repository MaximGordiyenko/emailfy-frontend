import axios from 'axios';

export async function change_email(access_token, email) {
  return await axios.post(
    `/api/settings/email/change`,
    {
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

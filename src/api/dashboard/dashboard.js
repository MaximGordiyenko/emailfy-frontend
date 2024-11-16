import { API, getToken, setToken, removeToken } from '../API';
import { refreshAccessToken } from '../auth/auth';

export const getDashboardData = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get('/auth/dashboard', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
    /*if (error.response && error.response.status === 403) {
      // Access token has expired, refresh it and retry the original request
      const newAccessToken = await refreshAccessToken();
      setToken('accessToken', newAccessToken);

      // Retry the original request with the new access token
      const { data } = await API.get('/auth/dashboard', {
        headers: { Authorization: `Bearer ${newAccessToken}` },
      });
      return data;
    } else {
      // Handle other errors
      console.error(error);
      throw error;
    }*/
  }
};

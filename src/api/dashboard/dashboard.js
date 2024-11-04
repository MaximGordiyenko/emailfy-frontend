import { API, getToken } from '../API';
import { refreshAccessToken } from '../auth/auth';

export const dashboardData = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get('/auth/dashboard', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newAccessToken = await refreshAccessToken();

      // Retry the original request with the new access token
      const retryResponse = await API.get('/auth/dashboard', {
        headers: { Authorization: `Bearer ${newAccessToken}` },
      });
      return retryResponse.data;
    }
    throw error; // Rethrow if it's a different error
  }
};

import { API } from '../API';

export const getUser = async () => {
  try {
    const { data } = await API.get('/auth/account-info');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAccountData = async ({
  email,
  currentPassword,
  newPassword,
  repeatNewPassword,
}) => {
  try {
    const {
      data: { message },
    } = await API.post('/settings/update', {
      email,
      currentPassword,
      newPassword,
      repeatNewPassword,
    });
    return { message };
  } catch (error) {
    throw error;
  }
};

export const uploadProfileImage = async (formData) => {
  try {
    const response = await API.post('/settings/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export const getProfileImageById = async () => {
  try {
    const {
      data: { AWSImageUrl },
    } = await API.get(`/settings/images`);
    return { AWSImageUrl };
  } catch (error) {
    throw error;
  }
};

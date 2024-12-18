import { API, getToken } from '../API';

export const getTotalEmailAnalytics = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/dashboard/totalEmailAnalytics`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCampaignStatisticsByEmailID = async (emailID) => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/dashboard/campaignStatisticsByEmailID/${emailID}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClientEmails = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/dashboard/clientEmails`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTotalUnsubscribedEmailStatistic = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/dashboard/totalUnsubscribedEmailStatistic`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAccountStatus = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/account-status`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAudienceStatus = async () => {
  try {
    const accessToken = getToken('accessToken');
    const { data } = await API.get(`/auth/audience-status`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

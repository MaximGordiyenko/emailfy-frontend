import { API } from '../API.js';

export const fetchMessages = async ({ sessionId }) => {
  const res = await API.get(`/messages`, {
    params: { sessionId },
  });
  return res.data;
};

export const sendMessageApi = async ({ accountId, sessionId, message }) => {
  try {
    await API.post(`/send`, { accountId, sessionId, message });
  } catch (error) {
    throw error;
  }
};

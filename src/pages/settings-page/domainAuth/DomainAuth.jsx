import { createContext, useEffect, useState } from 'react';
import StepProgress from './authSteps/StepProgress.jsx';
import { check_smtp } from '../../../api/settings/settings.js';
import { initialStatusData } from '../../../constants/common.constants.js';
import { getToken } from '../../../api/API.js';
import { Typography } from 'antd';
const { Title, Text, Link } = Typography;

export const CheckStatusContext = createContext({
  loading: false,
  statusData: initialStatusData,
  checkStatus: async () => {},
});

export const DomainAuth = () => {
  const [statusData, setStatusData] = useState(initialStatusData);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const access_token = getToken('accessToken');
      const response = await check_smtp(access_token);
      setStatusData(response.data);
    } catch (e) {
      console.log(e?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus().catch();
  }, []);

  const value = {
    loading,
    statusData,
    checkStatus,
  };

  return (
    <CheckStatusContext.Provider value={value}>
      <Title level={3}>Domain authentication</Title>
      <StepProgress />
    </CheckStatusContext.Provider>
  );
};

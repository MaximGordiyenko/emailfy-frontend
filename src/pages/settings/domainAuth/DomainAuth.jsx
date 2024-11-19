import { createContext, useEffect, useState } from 'react';
import StepProgress from './authSteps/StepProgress';
import { check_smtp } from '../../../api/settings/settings';
import { initialStatusData } from '../../../constants/common.constants';
import { getToken } from '../../../api/API';
import './styles.css';

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
      <div className="domain-auth">
        <div className="steps-body">
          <div className="domain-auth-title">Domain authentication</div>
          <StepProgress />
        </div>
      </div>
    </CheckStatusContext.Provider>
  );
};

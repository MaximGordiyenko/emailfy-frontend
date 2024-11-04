import React, { createContext, useEffect, useState } from 'react';
import StepProgress from './authSteps/StepProgress';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import settings from '../../../../assets/images/settings.png';
import { check_smtp } from '../../../../api/settings/settings';
import { initialStatusData } from '../../../../constants';
import BrandHeader from '../../../../components/header/BrandHeader';
import { getToken } from '../../../../api/API';

export const CheckStatusContext = createContext({
  loading: false,
  statusData: initialStatusData,
  checkStatus: async () => {},
});

export const DomainAuth = () => {
  const navigate = useNavigate();
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

  const handleNav = () => {
    navigate('/settings');
  };

  useEffect(() => {
    checkStatus().catch();
  }, []);

  const value = {
    loading,
    statusData,
    checkStatus,
  };

  const renderHeaderContent = () => {
    return (
      <button className="domain-auth-header-button" onClick={handleNav}>
        <span>Save & exit</span>
      </button>
    );
  };

  return (
    <CheckStatusContext.Provider value={value}>
      <div className="domain-auth">
        <BrandHeader
          icon={settings}
          description={'Settings'}
          params={'Domain authentication'}
          content={renderHeaderContent()}
        />
        <div className="steps-body">
          <div className="domain-auth-title">Domain authentication</div>
          <StepProgress />
        </div>
      </div>
    </CheckStatusContext.Provider>
  );
};

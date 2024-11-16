import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { check_smtp, delete_smtp, get_smtp } from '../../../api/settings/settings';
import { initialSmtpData, initialStatusData } from '../../../constants';
import validIcon from '../../../assets/images/validCheckCircle.svg';
// import notValidIcon from '../../../assets/images/notValidCheckCircle.svg';
import pendingIcon from '../../../assets/images/clockCircle.svg';
import tubeSpinner from '../../../assets/images/tube-spinner.svg';
import { getToken } from '../../../api/API';

export const DomainInformationTab = () => {
  const navigate = useNavigate();
  const [smtp, setSmtp] = useState(initialSmtpData);
  const [statusData, setStatusData] = useState(initialStatusData);
  const [statusLoading, setStatusLoading] = useState(false);

  const { domain } = smtp;

  const statusIcon = statusData.status ? validIcon : pendingIcon;

  const getSmtp = async () => {
    try {
      const access_token = getToken('accessToken');
      const { data } = await get_smtp(access_token);
      if (!data.error) {
        setSmtp(data);
      }
    } catch (e) {
      console.log(e?.response?.data);
    }
  };

  const handleCheckStatus = async () => {
    setStatusLoading(true);
    try {
      const access_token = getToken('accessToken');
      const response = await check_smtp(access_token);
      setStatusData(response.data);
    } catch (e) {
      console.log(e?.response?.data);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      const access_token = getToken('accessToken');
      const response = await delete_smtp(access_token);
      console.log('delete_smtp response: ', response);
      setSmtp(initialSmtpData);
      setStatusData(initialStatusData);
    } catch (e) {
      console.log(e?.response?.data);
    }
  };

  const handleClickVerify = () => {
    navigate('/settings/domain_auth');
  };

  useEffect(() => {
    getSmtp().catch();
  }, []);

  return (
    <div className="domain-wrapper">
      <div className="domain-content">
        <div className="domain-left-content">
          <span className="domain-title">Email domains</span>
          <span className="domain-description">
            Your email domains control how your emails are sent through Mailchimp. Verifying and
            authenticating your domain helps your hard work get to your customers&apos; inboxes.
          </span>
        </div>
        <div className="domain-right-content">
          {domain ? (
            <div className="domain-info-wrapper">
              <div className="domain-info">
                <span>{domain}</span>
                <div className="status-icon">
                  {!statusLoading && <img src={statusIcon} className="status-icon" alt="" />}
                </div>
              </div>
              <button onClick={handleCheckStatus} className="domain-info-button">
                {statusLoading ? (
                  <img src={tubeSpinner} className="status-loader" alt="" />
                ) : (
                  <span>Check status</span>
                )}
              </button>
              <button onClick={handleRemove} className="domain-info-button">
                <span>Remove</span>
              </button>
            </div>
          ) : (
            <button className="domain-verify-button" onClick={handleClickVerify}>
              <span>Add & Verify Domain</span>
            </button>
          )}
        </div>
      </div>
      {domain && (
        <button className="domain-verify-button" onClick={handleClickVerify}>
          <span>Add & Verify Domain</span>
        </button>
      )}
    </div>
  );
};

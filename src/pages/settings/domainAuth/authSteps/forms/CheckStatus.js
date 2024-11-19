import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './nextButton';
import { CheckStatusContext } from '../../DomainAuth';
import tubeSpinner from '../../../../../assets/images/tube-spinner.svg';

export const CheckStatus = () => {
  const navigate = useNavigate();
  const { loading, statusData, checkStatus } = useContext(CheckStatusContext);

  const { status } = statusData;

  const statusText = status ? 'Success!' : 'Pending...';
  const buttonText = status ? 'Nice! Go to emailfy!' : 'Check status';

  const onClick = () => {
    if (status) {
      navigate('/settings');
    } else {
      checkStatus().catch();
    }
  };

  useEffect(() => {
    checkStatus().catch();
  }, []);

  return (
    <div className="form-content sixth-form-content check-status-content">
      <p className="sixth-form-content-title">{loading ? '' : statusText}</p>
      <div className="sixth-form-content-text">
        {!loading && (
          <span>
            {status
              ? 'Emailfy processed your entry and successfully approved it'
              : 'Emailfy is still processing your record'}
          </span>
        )}
      </div>
      <Button
        className={`check-status-button ${status ? 'success' : ''}`}
        name={loading ? <img src={tubeSpinner} className="status-loader" alt="" /> : buttonText}
        onClick={onClick}
        disabled={loading}
      />
    </div>
  );
};

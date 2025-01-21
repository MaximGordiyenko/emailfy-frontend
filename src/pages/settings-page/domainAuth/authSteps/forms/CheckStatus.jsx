import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckStatusContext } from '../../DomainAuth';
import { Divider, Space, Card, Button, Typography, message } from 'antd';
const { Title, Text, Link } = Typography;

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
    <Card>
      <Text>{loading ? '' : statusText}</Text>
      <Divider />

      {!loading && (
        <span>
          {status
            ? 'Emailfy processed your entry and successfully approved it'
            : 'Emailfy is still processing your record'}
        </span>
      )}

      <Button
        size="large"
        type="primary"
        // className={`check-status-button ${status ? 'success' : ''}`}
        // disabled={loading}
        // icon={loading ? <img src={tubeSpinner} className="status-loader" alt="bla" /> : buttonText}
        onClick={() => message.success('Processing complete!')}>
        {buttonText}
      </Button>
    </Card>
  );
};

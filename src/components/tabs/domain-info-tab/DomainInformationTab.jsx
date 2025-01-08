import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../routes/routes.constants.js';

import { getToken } from '../../../api/API.js';
import { check_smtp, delete_smtp, get_smtp } from '../../../api/settings/settings.js';

import { initialSmtpData, initialStatusData } from '../../../constants/common.constants.js';

import { Form, Button, Typography, Space, Flex, message, Divider } from 'antd';
import { DomainAuth } from '../../../pages/settings-page/domainAuth/DomainAuth.jsx';
const { Title, Text, Link } = Typography;

export const DomainInformationTab = () => {
  const navigate = useNavigate();
  const [smtp, setSmtp] = useState(initialSmtpData);
  const [statusData, setStatusData] = useState(initialStatusData);
  const [statusLoading, setStatusLoading] = useState(false);

  const { domain } = smtp;

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
      setSmtp(initialSmtpData);
      setStatusData(initialStatusData);
    } catch (e) {
      console.log(e?.response?.data);
    }
  };

  const handleClickVerify = () => {
    navigate(`/${ROUTE.settings}/${ROUTE.domainInfo}/${ROUTE.domainAuth}`);
  };

  useEffect(() => {
    getSmtp().catch();
  }, []);

  return (
    <Space direction="vertical" size="large" rootClassName="domain-info-tab-container">
      <Space direction="vertical" size="small">
        <Title level={3}>Email domains</Title>
        <Text>
          Your email domains control how your emails are sent through Mailchimp. Verifying and
          authenticating your domain helps your hard work get to your customers&apos; inboxes.
        </Text>
        <Space direction="vertical" size="small">
          <span>{domain}</span>
          <Button onClick={handleCheckStatus}>Check status</Button>
          <Button onClick={handleRemove}>Remove</Button>
          <Button onClick={handleClickVerify}>Add & Verify Domain</Button>
          {domain && <Button onClick={handleClickVerify}>Add & Verify Domain</Button>}
        </Space>
      </Space>

      <Divider />

      <DomainAuth />
    </Space>
  );
};

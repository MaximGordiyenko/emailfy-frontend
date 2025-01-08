import { useNavigate } from 'react-router-dom';
import AuthCode from 'react-auth-code-input';
import { useEffect, useState } from 'react';
import { ROUTE } from '../../routes/routes.constants.js';
import { BrandLogo } from '../../components/logo/BrandLogo.jsx';
import { Flex, Space, Button, message, Typography } from 'antd';
import './styles.css';

const { Title, Text, Link } = Typography;

export const DisableAuthPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const userEmail = useSelector((state) => state.user.email);
  const [result, setResult] = useState();
  const [savedEmail, setSavedEmail] = useState();

  useEffect(() => {
    // Fetch the saved email from Redux state when the component mounts
    const storedEmail = localStorage.getItem('userEmail');
    console.log(storedEmail, 'storedEmail');
    setSavedEmail(storedEmail);
  }, [savedEmail]);
  const handleOnChange = (res) => {
    setResult(res);
  };

  const navigate = useNavigate();

  return (
    <div className={'auth-form-container'}>
      <BrandLogo />
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Space direction="vertical" size="small">
          <Title level={4}>Check your inbox!</Title>
          <Text>We have sent an email with instructions to confirm your email address to </Text>
        </Space>

        {contextHolder}

        <AuthCode
          onChange={handleOnChange}
          containerClassName={'two-factor-input-box'}
          allowedCharacters={'numeric'}
        />

        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={() => {
            navigate(`/${ROUTE.settings}`);
          }}>
          Back to the settings
        </Button>

        <Text>
          By clicking on the “Create an account” button you’re agreeing with our {``}
          <Link href={`#`}>Privacy Policy {``}</Link>
          and {``}
          <Link href={`#`}>Terms and Conditions.</Link>
        </Text>

        <Flex justify="center" align="center" gap={4}>
          <Text>Didn&apos;t get the email?</Text>
          <Link href={`/${ROUTE.registration}`}>Resend</Link>
        </Flex>
      </Space>
    </div>
  );
};

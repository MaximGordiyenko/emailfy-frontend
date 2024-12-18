import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { verifyUser } from '../../store/userSlice';
import { useEffect } from 'react';
import { BrandLogo } from '../../components/logo/BrandLogo';
import { Button, Typography, Space, Flex, message } from 'antd';
import { ROUTE } from '../../routes/routes.constants';

const { Title, Text, Link } = Typography;

export const EmailConfirmationPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const dispatch = useDispatch();

  useEffect(() => {
    const token = window.location.href.split('/').pop();
    if (token) {
      // dispatch(verifyUser(token)).then((result) => {
      //   console.log(result, 'verify handler');
      // });
    }
  }, []);

  return (
    <div className={'auth-form-container'}>
      <BrandLogo />
      <Flex gap={4} vertical style={{ margin: '0 0 20px 0' }}>
        <Title level={4}>Email confirmed!</Title>
        <Text>Thank you for the registration. Please enjoy your Emailfy experience!</Text>
      </Flex>
      {contextHolder}
      <Button type="primary" block style={{ margin: '0 0 20px 0' }}>
        Let&apos;s roll!
      </Button>

      <Text>
        By clicking on the “Create an account” button you’re agreeing with our {``}
        <Link href={`#`}>Privacy Policy {``}</Link>
        and {``}
        <Link href={`#`}>Terms and Conditions.</Link>
      </Text>

      <Flex justify="center" gap={4}>
        <Text>Let create your own campaign at the </Text>
        <Link href={`/${ROUTE.dashboard}`}>Dashboard</Link>
      </Flex>
    </div>
  );
};

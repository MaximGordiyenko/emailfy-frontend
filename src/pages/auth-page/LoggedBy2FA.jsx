import { useEffect, useState } from 'react';
import AuthCode from 'react-auth-code-input';

import { ROUTE } from '../../routes/routes.constants';
import { BrandLogo } from '../../components/logo/BrandLogo';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from '../../validation/auth';

import { Form, Button, Typography, Space, Flex, message } from 'antd';
const { Title, Text, Link } = Typography;

export const LoggedBy2FA = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidation),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  // const userEmail = useSelector((state) => state.user.email);
  const [code, setCode] = useState('');

  const sendCode = () => {
    // dispatch(sendCode2FA()).then(async (result) => {
    //   if (result.payload) {
    //     console.log(result.payload, 'reuslt sending');
    //   } else {
    //     console.log('sending code error');
    //   }
    // });
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    console.log(code, 'code');
    // dispatch(verifyCode2FA(code)).then(async (result) => {
    //   if (result.payload) {
    //     console.log(result.payload, 'reuslt submitting');
    //     navigate('/dashboard');
    //   } else {
    //     console.log('verification code error');
    //   }
    // });
  };

  useEffect(() => {
    sendCode();
  }, []);

  return (
    <div className={'auth-form-container'}>
      <BrandLogo />

      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Space direction="vertical" size="small">
          <Title level={4}>Security verification</Title>
          <Text>We have sent a confirmation code to your e-mail address{/*userEmail*/}</Text>
        </Space>

        {contextHolder}

        <Form layout="vertical" onFinish={handleSubmit(verifyCode)}>
          <Space direction="vertical" size="large" align="center">
            <Space size="small">
              <AuthCode
                onChange={setCode}
                containerClassName={'two-factor-input-box'}
                allowedCharacters={'numeric'}
              />
            </Space>

            <Space size="small">
              {/*<Form.Item>*/}
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
              {/*</Form.Item>*/}
            </Space>
          </Space>
        </Form>

        {/*<Space direction="vertical">*/}
        {/*  <Text>Must contain at least 8 characters</Text>*/}
        {/*  <Text>Must contain at least one uppercase character</Text>*/}
        {/*  <Text>Must contain at least one lowercase character</Text>*/}
        {/*  <Text>Must contain at least one number</Text>*/}
        {/*  <Text>Must contain at least one special character @, $, !, %, *, ?, &</Text>*/}
        {/*</Space>*/}

        <Text>
          By clicking on the “Create an account” button you’re agreeing with our {``}
          <Link href={`#`}>Privacy Policy {``}</Link>
          and {``}
          <Link href={`#`}>Terms and Conditions.</Link>
        </Text>

        <Text>
          Didn&apos;t get the email? <b onClick={sendCode}>Resend</b>
        </Text>
      </Space>
    </div>
  );
};

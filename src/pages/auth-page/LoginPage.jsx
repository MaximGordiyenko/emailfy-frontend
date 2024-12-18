import { useAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../api/auth/auth';
import { removeToken } from '../../api/API';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from '../../validation/auth.js';

import { Form, Button, Typography, Space, Flex, message } from 'antd';
import { AuthInput } from '../../components/forms/AuthInput.tsx';
import { BrandLogo } from '../../components/logo/BrandLogo';

import './styles.css';

const { Title, Text, Link } = Typography;

export const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const { mutate } = useMutation({
    mutationFn: (data) => signIn(data),
    onSuccess: ({ accessToken, refreshToken, message }) => {
      login(accessToken, refreshToken, navigate);
      messageApi.open({
        type: 'success',
        content: `${message}`,
      });
    },
    onError: (error) => {
      removeToken('accessToken');
      if (error.response?.data?.message) {
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      } else {
        messageApi.open({
          type: 'error',
          content: 'An unexpected error occurred',
        });
      }
    },
  });

  const onSubmit = async (data) => {
    await mutate(data);
  };

  return (
    <div className={'auth-form-container'}>
      <BrandLogo />
      <Title level={2}>Glad you’re back!</Title>
      <Title level={3}>Sign in to continue.</Title>
      {contextHolder}
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AuthInput
          name={'email'}
          label={'Email'}
          placeholder={'Enter your email'}
          type={'text'}
          control={control}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        />

        <AuthInput
          name={'password'}
          label={'Password'}
          placeholder={'Enter your password'}
          type={'password'}
          control={control}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        />

        <Flex justify="end" style={{ margin: '0 0 20px 0' }}>
          <Link href={`/${ROUTE.forgotPassword}`}>Forgot Password?</Link>
        </Flex>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Space direction="vertical">
        <Text>Must contain at least 8 characters</Text>
        <Text>Must contain at least one uppercase character</Text>
        <Text>Must contain at least one lowercase character</Text>
        <Text>Must contain at least one number</Text>
        <Text>Must contain at least one special character @, $, !, %, *, ?, &</Text>
      </Space>

      <Text>
        By clicking on the “Create an account” button you’re agreeing with our {``}
        <Link href={`#`}>Privacy Policy {``}</Link>
        and {``}
        <Link href={`#`}>Terms and Conditions.</Link>
      </Text>

      <Flex justify="center" align="center" gap={4}>
        <Text>Not registered yet?</Text>
        <Link href={`/${ROUTE.registration}`}>Sign Up</Link>
      </Flex>
    </div>
  );
};

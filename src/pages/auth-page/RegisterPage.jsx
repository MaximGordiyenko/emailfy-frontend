import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants.js';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../validation/auth.js';

import { Form, Button, Typography, Space, Flex, message } from 'antd';
import { AuthInput } from '../../components/forms/AuthInput.tsx';
import { BrandLogo } from '../../components/logo/BrandLogo.jsx';

import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../api/auth/auth.js';
import './styles.css';

const { Title, Text, Link } = Typography;

export const RegisterPage = () => {
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidation),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: ({ message, userId }) => {
      messageApi.open({
        type: 'success',
        content: `${message} with user id ${userId}`,
      });
      navigate(`/${ROUTE.login}`);
    },
    onError: (error) => {
      if (Array.isArray(error.response?.data?.error)) {
        error.response.data.error.forEach((el) =>
          messageApi.open({
            type: 'error',
            content: el.message,
          }),
        );
      } else {
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message,
        });
      }
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <div className={'auth-form-container'}>
      <BrandLogo />
      <Title level={1}>Create an Account</Title>
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

        <AuthInput
          name={'confirmPassword'}
          label={'Confirm Password'}
          placeholder={'Confirm your password'}
          type={'password'}
          control={control}
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
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
      <Space>
        <Text>
          By clicking on the “Create an account” button you’re agreeing with our {``}
          <Link href={`#`}>Privacy Policy {``}</Link>
          and {``}
          <Link href={`#`}>Terms and Conditions.</Link>
        </Text>
      </Space>
      <Flex justify="center" align="center" gap={4}>
        <Text>Already have an account?</Text>
        <Link href={`/${ROUTE.login}`}>Sign In</Link>
      </Flex>
    </div>
  );
};

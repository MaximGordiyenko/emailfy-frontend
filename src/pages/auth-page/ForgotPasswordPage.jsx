import { useState } from 'react';
import { AppButton } from '../../components/button/AppButton';
import { reset_password } from '../../api/settings/settings';
import { BrandLogo } from '../../components/logo/BrandLogo';
import { AuthInput } from '../../components/forms/AuthInput.tsx';
import { ROUTE } from '../../routes/routes.constants';
import { Form, Button, Typography, Space, Flex, message } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from '../../validation/auth';

const { Title, Text, Link } = Typography;

export const ForgotPasswordPage = () => {
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

  /*const handleSubmit = async (e) => {
   e.preventDefault();
   let isError = false;
   if (!email.value) {
   setEmail({ value: '', error: 'Email is require' });
   isError = true;
   }
   if (email.value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
   isError = true;
   setEmail({ value: '', error: 'Email incorrect' });
   }
   if (!isError) {
   setSubmittedEmail(email.value);
   setEmail({ value: '', error: '' });
   setIsSubmit(true);
   try {
   await reset_password(email.value);
   setSubmittedEmail(email.value);
   setEmail({ value: '', error: '' });
   setIsSubmit(true);
   } catch (error) {
   console.error('Error resetting password:', error);
   }
   }
   };*/

  // const handleResend = async () => {
  //   if (submittedEmail) {
  //     try {
  //       await reset_password(submittedEmail);
  //     } catch (error) {
  //       console.error('Error resending password reset:', error);
  //     }
  //   }
  // };

  const onSubmit = async (data) => {
    // await mutate(data);
  };

  return (
    <div className={'auth-form-container'}>
      <BrandLogo />
      <Flex gap={4} vertical style={{ margin: '0 0 20px 0' }}>
        <Title level={4}>Forgot password?</Title>
        <Text>
          Please enter the email you used to create the account, and we&apos;ll send you a link to
          reset your password.
        </Text>
      </Flex>
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

        <Flex
          justify="flex-end"
          align="flex-start"
          gap={4}
          vertical
          style={{ margin: '0 0 20px 0' }}>
          <Text>We&apos;ve sent an Email to with a link to reset your password.</Text>
          <Text>
            Didn&apos;t get the email? <Link href={`/${ROUTE.forgotPassword}`}>Resend</Link>
          </Text>
        </Flex>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Request a Password Reset
          </Button>
        </Form.Item>
      </Form>
      <Space>
        <Text>
          By clicking on the “Create an account” button you’re agreeing with our {``}
          <Link href={`#`}>Privacy Policy {``}</Link>
          and {``}
          <Link href={`#`}>Terms and Conditions.</Link>
        </Text>
      </Space>
      <Flex justify="center" gap={4}>
        <Text>Already have an account?</Text>
        <Link href={`/${ROUTE.login}`}>Sign In</Link>
      </Flex>
    </div>
  );
};

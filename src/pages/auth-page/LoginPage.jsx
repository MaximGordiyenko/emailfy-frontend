import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { useMutation } from 'react-query';
import { signIn } from '../../api/auth/auth';
import { removeToken } from '../../api/API';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from '../../validation/auth.js';

import { Form, Button } from 'antd';
import CheckboxForm from '../../components/forms/Checkbox.tsx';
import { AuthInput } from '../../components/forms/AuthInput.tsx';

import brandLogo from '../../assets/images/logoRedesigned.png';
import './styles.css';

export const LoginPage = () => {
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

  const { mutate } = useMutation((data) => signIn(data), {
    onSuccess({ accessToken, refreshToken, message }) {
      login(accessToken, refreshToken, navigate);
      toast.success(message);
    },
    onError(error) {
      removeToken('accessToken');
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const onSubmit = async (data) => {
    await mutate(data);
  };

  return (
    <div className={'login-wrapper'}>
      <div className={'login'}>
        <div className={'logo'}>
          <img src={brandLogo} alt={'logo'} />
        </div>
        <h1 className={'form-title'}>Glad you’re back! Sign in to continue.</h1>
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

          <CheckboxForm
            name="remember"
            text={'Remember me'}
            control={control}
            label="Remember me"
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <span className={'redirect-link-container'}>
        Not registered yet?
        <Link to={`/${ROUTE.registration}`}>Sign Up</Link>
      </span>
    </div>
  );
};

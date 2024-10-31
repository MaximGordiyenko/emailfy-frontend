import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { useDispatch } from 'react-redux';
import { loginAccount } from '../../store/accountSlice.js';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidation } from '../../validation/auth.js';

import { Form, Button } from 'antd';
import CheckboxForm from '../../components/forms/Checkbox.tsx';
import AuthInput from '../../components/forms/AuthInput.tsx';

import brandLogo from '../../assets/images/logoRedesigned.png';

import './styles.css';

export const SignInPage = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    const result = await dispatch(loginAccount(data));
    if (loginAccount.fulfilled.match(result)) {
      navigate(from);
    }
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
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
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
        <p onClick={() => navigate(`${ROUTE.signUp}`)}>Sign Up</p>
      </span>
    </div>
  );
};

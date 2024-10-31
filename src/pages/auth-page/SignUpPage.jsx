import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../validation/auth.js';

import { Form, Button } from 'antd';
import AuthInput from '../../components/forms/AuthInput.tsx';

import { useDispatch } from 'react-redux';
import { registerAccount } from '../../store/accountSlice.js';

import brandLogo from '../../assets/images/logoRedesigned.png';
import alertIcon from '../../assets/images/alert_circle.png';

import './styles.css';

export const SignUpPage = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/signIn';

  const onSubmit = async (data) => {
    dispatch(registerAccount(data));
    const result = await dispatch(registerAccount(data));
    console.log(result);
    if (registerAccount.fulfilled.match(result)) {
      navigate(from);
    }
  };

  return (
    <div className={'login-wrapper'}>
      <div className={'login'}>
        <div className={'logo'}>
          <img src={brandLogo} alt={'logo'} />
        </div>
        <h1 className={'form-title'}>Create an Account</h1>
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

          <AuthInput
            name={'confirmPassword'}
            label={'Confirm Password'}
            placeholder={'Confirm your password'}
            type={'password'}
            control={control}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className={'input-conditions'}>
          <li>Must contain at least 8 characters</li>
          <li>Must contain at least 1 uppercase character;</li>
        </div>
        <div className={'privacy-container'}>
          <img src={alertIcon} alt={'alert'} />
          <p>
            By clicking on the “Create an account” button you’re agreeing with our {``}
            <Link to={`#`} className={'privacy-links'}>
              Privacy Policy {``}
            </Link>
            and {``}
            <Link to={`#`} className={'privacy-links'}>
              Terms and Conditions.
            </Link>
          </p>
        </div>
      </div>
      <span className={'redirect-link-container'}>
        Already have an account?
        <p onClick={() => navigate(`${ROUTE.signIn}`)}>Sign In</p>
      </span>
    </div>
  );
};

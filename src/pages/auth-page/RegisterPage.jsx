import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../../validation/auth.js';

import { Form, Button } from 'antd';
import AuthInput from '../../components/forms/AuthInput.tsx';

import brandLogo from '../../assets/images/logoRedesigned.png';
import alertIcon from '../../assets/images/alert_circle.png';

import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import './styles.css';
import { useMutation } from 'react-query';
import { signUp } from '../../api/auth/auth';

export const RegisterPage = () => {
  // const { register } = useAuth();

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

  const navigate = useNavigate();

  const { mutate } = useMutation((data) => signUp(data), {
    onSuccess() {
      toast.success('You are register successfully');
      navigate(`/${ROUTE.login}`);
    },
    onError(error) {
      if (Array.isArray(error.response.data.error)) {
        error.response.data.error.forEach((el) => toast.error(el.message));
      } else {
        toast.error(error.response.data.message);
      }
    },
  });
  const onSubmit = async (data) => {
    mutate(data);
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
        <div className={'input-conditions'}>
          <li>Must contain at least 8 characters</li>
          <li>Must contain at least one uppercase character</li>
          <li>Must contain at least one lowercase character</li>
          <li>Must contain at least one number</li>
          <li>Must contain at least one special character @, $, !, %, *, ?, &</li>
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
        Already have an account? {``}
        <Link to={`/${ROUTE.login}`}>Sign In</Link>
      </span>
    </div>
  );
};

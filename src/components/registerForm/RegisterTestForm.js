import './style.scss';
import brandlogo from '../../assets/images/logoRedesigned.png';
import eye from '../../assets/images/eye.png';
import slasheye from '../../assets/images/eyeslash.png';
import alert from '../../assets/images/alert_circle.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerUser, setUserEmail } from '../../store/userSlice';
import xmark from '../../assets/images/xblack.png';

export const RegisterTestForm = ({ onClick, toggleImg }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [viewPassword, setViewPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const handleClearInput = () => {
    setEmail({ value: '', error: '' });
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    const userCredentials = {
      login: email.value,
      password: password.value,
    };
    if (!userCredentials.login) {
      setEmail({ value: '', error: 'Email is require' });
      isError = true;
    }
    if (
      userCredentials.login &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userCredentials.login)
    ) {
      isError = true;
      setEmail({ value: '', error: 'This email does not exist or entered incorrectly' });
    }
    if (!userCredentials.password) {
      setPassword({ value: '', error: 'Please, enter a password' });
      isError = true;
    }
    if (userCredentials.password.length < 8) {
      isError = true;
      setPassword({ value: '', error: 'Your password must contain at least 8 characters' });
    }
    if (!/[A-Z]/.test(userCredentials.password)) {
      isError = true;
      setIsSubmit(false);
      setPassword({
        value: '',
        error: 'Your password must contain at least one uppercase letter',
      });
    }
    if (!isError) {
      setPassword({ value: '', error: '' });
      setEmail({ value: '', error: '' });
      setIsSubmit(true);
      dispatch(clearError());
      dispatch(setUserEmail(email.value));
      dispatch(registerUser(userCredentials)).then(async (result) => {
        if (result) {
          setPassword({ value: '', error: '' });
          setEmail({ value: '', error: '' });
        } else {
          return error;
        }
      });
    }
    if (isSubmit) {
      dispatch(clearError());
    }
  };

  const handleChangePass = (e) => {
    setPassword({ value: e.target.value, error: '' });
    setIsFilled(true);
  };
  const handleChangeEmail = (e) => {
    setEmail({ value: e.target.value, error: '' });
    setIsFilled(true);
  };

  const togglePassword = () => {
    setViewPassword(!viewPassword);
  };
  return (
    <div className={'reg-wrapper'}>
      <div className={'register'}>
        <div className={'logo'}>
          <img src={brandlogo} alt={'logo'} />
        </div>
        <h1 className={'form-title'}>Create an Account</h1>
        <form className={'reg-form'} onSubmit={handleSubmit}>
          <div className={'email'}>
            <span className={'reg-email-label'}>Email address</span>
            <input
              placeholder={'youremail@mail.com'}
              onChange={handleChangeEmail}
              value={email.value}
              type={'text'}
              className={!isSubmit && email.error ? 'wrong-email-field' : 'reg-email-field'}
            />
            <img
              src={xmark}
              className={email.value.length ? 'clear-area' : 'x-hide'}
              style={isSafari ? { display: 'none' } : null}
              onClick={handleClearInput}
            />
            {error && <div className="error-message-reg">{error}</div>}
            <p className={!isSubmit ? 'reg-error-show' : 'reg-error-hide'}>{email.error}</p>
          </div>
          <div className={'pass'}>
            <label>Password</label>
            <div className={'pass-input'}>
              <input
                value={password.value}
                type={viewPassword ? 'text' : 'password'}
                onChange={handleChangePass}
                placeholder={'Enter your password'}
                className={!isSubmit && password.error ? 'wrong-pass-field' : 'reg-pass-field'}
              />
              <img
                onClick={togglePassword}
                src={viewPassword ? slasheye : eye}
                alt={'eye'}
                className={isSafari ? 'hide-eye' : 'reg-eye'}
              />
            </div>
          </div>
          <button
            type={'submit'}
            className={'sign-up'}
            disabled={!(email.value && password.value && isFilled)}>
            <div>{'Create an account'}</div>
          </button>
          <div className={password.error ? 'error-conditions' : 'input-conditions'}>
            <li>Must contain at least 8 characters</li>
            <li>Must contain at least 1 uppercase character;</li>
          </div>
          <div className={'privacy'}>
            <img src={alert} alt={'alert'} />
            <p>
              By clicking on the “Create an account” button you’re agreeing with our{' '}
              <a>Privacy Policy</a> and <a>Terms and Conditions.</a>
            </p>
          </div>
        </form>
      </div>
      <span className={'log-in'}>
        Already have an account?
        <p onClick={onClick} onToggle={() => toggleImg}>
          Log In
        </p>
      </span>
    </div>
  );
};

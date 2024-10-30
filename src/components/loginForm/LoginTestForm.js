import brandlogo from '../../assets/images/logoRedesigned.png';
import eye from '../../assets/images/eye.png';
import slasheye from '../../assets/images/eyeslash.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import xmark from '../../assets/images/xblack.png';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../../store/userSlice';

export const LoginTestForm = ({ onClick, toggleImg }) => {
  const [loginPassword, setLoginPassword] = useState({ value: '', error: '' });
  const [loginEmail, setLoginEmail] = useState({ value: '', error: '' });
  const [loginRemember, setLoginRemember] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  const error = useSelector((state) => state.user.error);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPass = () => {
    navigate('/forgotpass');
  };
  const handleClearInput = () => {
    setLoginEmail({ value: '', error: '' });
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    const userCredentials = {
      login: loginEmail.value,
      password: loginPassword.value,
      remember: loginRemember,
    };
    if (!userCredentials.login) {
      setLoginEmail({ value: '', error: 'Email is require' });
      isError = true;
    }
    if (
      userCredentials.login &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userCredentials.login)
    ) {
      isError = true;
      setLoginEmail({ value: '', error: 'Email incorrect' });
    }
    if (!userCredentials.password) {
      setLoginPassword({ value: '', error: 'Please, enter a password' });
      isError = true;
    }
    if (userCredentials.password.length < 8) {
      isError = true;
      setLoginPassword({ value: '', error: 'Your password must contain at least 8 characters' });
    }
    if (!/[A-Z]/.test(userCredentials.password)) {
      isError = true;
      setLoginPassword({
        value: '',
        error: 'Your password must contain at least one uppercase letter',
      });
    }
    if (!isError) {
      setLoginPassword({ value: '', error: '' });
      setLoginEmail({ value: '', error: '' });
      setIsSubmit(true);
      dispatch(loginUser(userCredentials)).then(async (result) => {
        if (result.payload) {
          setLoginPassword({ value: '', error: '' });
          setLoginEmail({ value: '', error: '' });
          if (result.payload.token_2fa) {
            navigate('/logged_2fa');
          } else {
            navigate('/dashboard');
          }
        } else {
          console.log('login error');
        }
      });
    }
  };

  const handleChangePass = (e) => {
    setLoginPassword({ value: e.target.value, error: '' });
    setisFilled(true);
  };
  const handleChangeEmail = (e) => {
    setLoginEmail({ value: e.target.value, error: '' });
    setisFilled(true);
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={'login-wrapper'}>
      <div className={'login'}>
        <div className={'logo'}>
          <img src={brandlogo} alt={'logo'} />
        </div>
        <h1 className={'form-title'}>Glad you’re back! Sign in to continue.</h1>
        <form className={'form'} onSubmit={handleSubmit}>
          <div className={'email'}>
            <span className={'email-span'}>Email address</span>
            <input
              className={!isSubmit && loginEmail.error ? 'wrong-email' : 'email-input no-autofill'}
              placeholder={'youremail@mail.com'}
              type={'text'}
              value={loginEmail.value}
              onChange={handleChangeEmail}
            />
            <img
              src={xmark}
              className={loginEmail.value.length ? 'clear-area' : 'x-hide'}
              style={isSafari ? { display: 'none' } : null}
              onClick={handleClearInput}
              alt="bla"
            />
          </div>
          <div className={'pass'}>
            <div className={'pass-description'}>
              <label>Password</label>
              <div onClick={handleForgotPass}>Forgot password?</div>
            </div>
            <div className={'pass-input'}>
              <input
                className={
                  !isSubmit && loginPassword.error ? 'wrong-pass' : 'pass-field no-autofill'
                }
                value={loginPassword.value}
                type={passwordShown ? 'text' : 'password'}
                onChange={handleChangePass}
                placeholder={'Enter your password'}
              />
              <img
                onClick={togglePassword}
                src={passwordShown ? slasheye : eye}
                alt={'eye'}
                className={!isSafari ? 'eye' : 'hide-img'}
              />
            </div>
            <div className={'radio-btn'}>
              <input
                id="html"
                type="checkbox"
                className={'custom-checkbox'}
                checked={loginRemember}
                onChange={(e) => setLoginRemember(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type={'submit'}
            disabled={!isFilled || loginPassword.error || loginEmail.error}
            className={'sign-in'}>
            <span>{'Sign In'}</span>
          </button>
        </form>
      </div>
      <span className={'sign-up'}>
        Not registered yet?
        <p onClick={onClick} onToggle={() => toggleImg}>
          Sign Up
        </p>
      </span>
    </div>
  );
};

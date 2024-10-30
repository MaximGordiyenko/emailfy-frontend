import InputComponent from '../../inputComponent/InputComponent';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../store/userSlice';
import PasswordInputComponent from '../../passInputComponent/PasswordInputComponent';
import { Button } from '../../../pages/homePage/settings/domainAuth/authSteps/forms/nextButton';
import checkCircle from '../../../assets/images/validCheckCircle.svg';
import axios from 'axios';
import { setToken2FA } from '../../../store/userSlice';
import { getAccessToken } from '../../../api/auth/auth';
import * as userInfoAPI from '../../../api/settings/user_info';
import * as emailSettingsAPI from '../../../api/settings/email';

export const UserInfo = ({ onSave, setOnSave }) => {
  const [email, setEmailState] = useState('');
  const [savedEmail, setSavedEmail] = useState();
  const [currentPassword, setCurrentPassword] = useState({ value: '', error: '' });
  const [newPassword, setNewPassword] = useState({ value: '', error: '' });
  const [repeatPassword, setRepeatPassword] = useState({ value: '', error: '' });
  const [isCorrectEmail, setIsCorrectEmail] = useState(false);
  const [isEnable2FA, setIsEnable2FA] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFilledCurrent, setIsFilledCurrent] = useState(false);
  const [isFilledNew, setIsFilledNew] = useState(false);
  const [isFilledRepeat, setIsFilledRepeat] = useState(false);
  const [reqErr, setReqErr] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token2fa = localStorage.getItem('token_2fa');
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      const userInfo = (await userInfoAPI.get_user_info(accessToken)).data;
      console.log(userInfo, 'userInfo');
      setEmailState(userInfo.email);
    })();
  }, []);

  useEffect(() => {
    if (!onSave) return;
    (async () => {
      const accessToken = await getAccessToken();
      await emailSettingsAPI.change_email(accessToken, email);
      setOnSave(false);
    })();
  }, [onSave]);

  const changePasswordButtonStatus = useMemo(() => {
    return isFilledCurrent && isFilledNew && isFilledRepeat;
  }, [isFilledCurrent, isFilledNew, isFilledRepeat]);

  const handleDisableEnableAuth = async () => {
    try {
      const accessToken = await getAccessToken();
      const req = await fetch('/api/settings/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ auth_2fa: !isEnable2FA, code_size: 6 }),
      });
      if (req.status !== 200) {
        throw new Error(`Error in 2FA login request: ${req.status}, ${await req.text()}`);
      }
      console.log(`2FA is ${!isEnable2FA ? 'enabled' : 'disabled'}`);
      setIsEnable2FA(!isEnable2FA);
    } catch (error) {
      console.error('Error in 2FA login request', error);
    }
  };

  const handleNav = () => {
    navigate('/verify', { replace: true });
  };

  useEffect(() => {
    (async () => {
      // Fetch the saved email from Redux state when the component mounts
      const storedEmail = localStorage.getItem('userEmail');
      console.log(storedEmail, 'storedEmail');
      setSavedEmail(storedEmail);

      const accessToken = await getAccessToken();

      fetch('/api/settings/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        res
          .json()
          .then((data) => {
            console.log(`2FA is ${data.auth_2fa ? 'enabled' : 'disabled'}`);
            setIsEnable2FA(data.auth_2fa);
          })
          .catch((error) => console.log(error, 'userinfo error'));
      });
    })();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    let userRegisterData = {
      password: newPassword.value,
    };
    if (!newPassword.value) {
      setNewPassword({ value: '', error: 'Please, enter a password' });
      isError = true;
    }
    if (newPassword.value.length < 8) {
      isError = true;
      setNewPassword({ value: '', error: 'Your password must contain at least 8 characters' });
    }
    if (!isError) {
      dispatch(registerUser(userRegisterData)).then((result) => {
        console.log(result, 'result of registering');
        if (result.payload) {
          setNewPassword({ value: '', error: '' });
          handleNav();
        }
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/verify');
        }
        if (result.meta.requestStatus === 'rejected') {
          return setReqErr('Registration request failed, check credentials or try again later');
        }
      });
    }
  };

  const handleChangeCurrentPass = (e) => {
    setCurrentPassword({ value: e.target.value, error: '' });
    setIsFilledCurrent(!!e.target.value);
  };

  const handleChangeNewPass = (e) => {
    setNewPassword({ value: e.target.value, error: '' });
    setIsFilledNew(!!e.target.value);
  };

  const handleChangeRepeatPass = (e) => {
    setRepeatPassword({ value: e.target.value, error: '' });
    setIsFilledRepeat(!!e.target.value);
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const getStoredEmail = localStorage.getItem('userEmail');

  return (
    <div className="user-info">
      <div className="email-info">
        <div className={'info-title'}>
          <h1>Email information</h1>
          <p>Primary email address to be used for audience outreach</p>
        </div>
        <InputComponent label={'Email address'} placeholder={'youremail@mail.com'} value={email} />
      </div>
      <form className="change-pass">
        <div className="change-pass-title">
          <h1>Change password</h1>
          <p>You can change your password at any time</p>
        </div>
        <div className="inputs-container">
          <PasswordInputComponent
            label="Current password"
            value={currentPassword.value}
            onChange={handleChangeCurrentPass}
            placeholder={'Enter the current password'}
            autocomplete={'current-password'}
          />
          <PasswordInputComponent
            label="New password"
            value={newPassword.value}
            onChange={handleChangeNewPass}
            placeholder={'Enter a new password'}
            autocomplete={'new-password'}
          />
          <PasswordInputComponent
            label="New password again"
            value={repeatPassword.value}
            onChange={handleChangeRepeatPass}
            placeholder={'Repeat the new password'}
            autocomplete={'new-password'}
          />
          <button
            className={`save-btn${changePasswordButtonStatus ? '' : ' inactive'}`}
            type={'submit'}>
            <span>Change password</span>
          </button>
        </div>
      </form>
      <div className="email-auth">
        <div className={'auth-title'}>
          <h1>Email authentication</h1>
          <p>Allows you to increase the security of your account</p>
        </div>
        <button className={isEnable2FA ? 'disable' : 'enable'} onClick={handleDisableEnableAuth}>
          <span>{isEnable2FA ? 'Disable' : 'Enable'}</span>
        </button>
        {/*{getStoredEmail ? (*/}
        {/*  <div className={'disable2FA'}>*/}
        {/*    <span>*/}
        {/*      <img src={checkCircle} alt={'checkCircle'} />*/}
        {/*      {getStoredEmail}*/}
        {/*    </span>*/}
        {/*    <Button name={'Disable'} onClick={handleDisableAuth} />*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    {isEnable2FA ? (*/}
        {/*      <form className={'input-email'}>*/}
        {/*        <InputComponent placeholder={'Enter your email'} onChange={handleChangeEmail} />*/}
        {/*        <button className={'cancel'} onClick={toggle2FA}>*/}
        {/*          <div>Cancel</div>*/}
        {/*        </button>*/}
        {/*        <button className={'save'} type={'submit'} onClick={handleSubmitEmail}>*/}
        {/*          <div>Save</div>*/}
        {/*        </button>*/}
        {/*      </form>*/}
        {/*    ) : (*/}
        {/*      <button className={'enable'} onClick={toggle2FA}>*/}
        {/*        <div>Enable</div>*/}
        {/*      </button>*/}
        {/*    )}*/}
        {/*  </>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

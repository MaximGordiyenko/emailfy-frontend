import './styles.css';
import { AppButton } from '../../components/button/AppButton';
import eye from '../../assets/images/eye.png';
import slasheye from '../../assets/images/eyeslash.png';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { confirm_reset_password } from '../../api/settings/settings';
import { useNavigate } from 'react-router-dom';
export const ResetPass = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({ value: '', error: '' });
  const [passwordRepeat, setPasswordRepeat] = useState({ value: '', error: '' });
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPassRepeat, setIsShowPassRepeat] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isError = false;
    if (password.value.length < 8) {
      isError = true;
      setPassword({ value: '', error: 'Your password must contain at least 8 characters' });
    }
    if (!/[A-Z]/.test(password.value)) {
      isError = true;
      setPassword({
        value: '',
        error: 'Your password must contain at least one uppercase letter',
      });
    }
    if (password.value !== passwordRepeat.value) {
      isError = true;
      setIsSubmit(false);
      setPassword({
        value: '',
        error: 'Passwords do not match ',
      });
      setPasswordRepeat({
        value: '',
        error: 'Passwords do not match ',
      });
    }
    if (!isError) {
      setPassword({ value: '', error: '' });
      setPasswordRepeat({ value: '', error: '' });
      setIsSubmit(true);
      try {
        const response = await confirm_reset_password(token, password.value);
        console.log('Password reset successful:', response.data);
        navigate('/loginpage');
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    }
    console.log(isError, 'error');
  };

  console.log(password.error);

  const handleChangePassRepeat = (e) => {
    setPasswordRepeat({ value: e.target.value, error: '' });
    setIsFilled(true);
  };

  const handleChangePass = (e) => {
    setPassword({ value: e.target.value, error: '' });
    setIsFilled(true);
  };

  const togglePass = () => {
    setIsShowPass((prev) => !prev);
  };
  const toggleRepeatPass = () => {
    setIsShowPassRepeat((prev) => !prev);
  };

  return (
    <div className={'reset-wrapper'}>
      <div className={'form-wrapper'}>
        <div className={'inner-content'}>
          <h1 className={'forgot-title'}>Reset the password</h1>
          <form className={'form'} onSubmit={handleSubmit}>
            <div className={'pass-reset'}>
              <label>Password</label>
              <div className={'pass-input'}>
                <input
                  value={password.value}
                  type={isShowPass ? 'text' : 'password'}
                  onChange={handleChangePass}
                  placeholder={'Enter your password'}
                  className={
                    passwordRepeat.error && password.error ? 'wrong-pass-field' : 'reg-pass-field'
                  }
                />
                <img
                  onClick={togglePass}
                  src={isShowPass ? slasheye : eye}
                  alt={'eye'}
                  className={!isSafari ? 'eye' : 'eye-hide'}
                />
              </div>
            </div>
            <div
              className={
                passwordRepeat.error || password.error
                  ? 'error-conditions'
                  : 'input-reset-conditions'
              }>
              <li>Must contain at least 8 characters</li>
              <li>Must contain at least 1 uppercase character;</li>
            </div>
            <div className={'pass-repeat'}>
              <label>Password</label>
              <div className={'pass-input'}>
                <input
                  value={passwordRepeat.value}
                  type={isShowPassRepeat ? 'text' : 'password'}
                  onChange={handleChangePassRepeat}
                  placeholder={'Enter your password'}
                  className={
                    password.error && passwordRepeat.error ? 'wrong-pass-field' : 'reg-pass-field'
                  }
                />
                <img
                  onClick={toggleRepeatPass}
                  src={isShowPassRepeat ? slasheye : eye}
                  alt={'eye'}
                  className={!isSafari ? 'eye' : 'eye-hide'}
                />
              </div>
            </div>
            {<span className="error-message">{passwordRepeat.error}</span> ||
              (password.error && (
                <span className="error-message">{passwordRepeat.error || password.error}</span>
              ))}
            <AppButton role="submit" label={'Save'} disabled={!isFilled && !isSubmit} />
          </form>
        </div>
      </div>
      <div className={'img-wrapper'} />
    </div>
  );
};

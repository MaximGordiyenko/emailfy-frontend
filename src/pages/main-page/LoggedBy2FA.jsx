import authImg from '../../assets/images/auth-picture.jpg';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import AuthCode from 'react-auth-code-input';
import { useEffect, useState } from 'react';
import { sendCode2FA, verifyCode2FA } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

export const LoggedBy2FA = () => {
  const userEmail = useSelector((state) => state.user.email);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sendCode = () => {
    dispatch(sendCode2FA()).then(async (result) => {
      if (result.payload) {
        console.log(result.payload, 'reuslt sending');
      } else {
        console.log('sending code error');
      }
    });
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    console.log(code, 'code');
    dispatch(verifyCode2FA(code)).then(async (result) => {
      if (result.payload) {
        console.log(result.payload, 'reuslt submitting');
        navigate('/dashboard');
      } else {
        console.log('verification code error');
      }
    });
  };

  useEffect(() => {
    sendCode();
  }, []);

  return (
    <div className={'disable-auth'}>
      <form className={'text-wrapper'} onSubmit={verifyCode}>
        <h1>Security verification</h1>
        <p>
          We have sent a confirmation code to your e-mail address: <b>{userEmail}</b>
        </p>
        <AuthCode
          onChange={setCode}
          containerClassName={'two-factor-input-box'}
          allowedCharacters={'numeric'}
        />
        <button type={'submit'}>Submit</button>
        <span>
          Didn&apos;t get the email? <b onClick={sendCode}>Resend</b>
        </span>
      </form>
      <div className={'img-wrapper'}>
        <img src={authImg} className={'confirmated-img'} alt="Authentication" />
      </div>
    </div>
  );
};

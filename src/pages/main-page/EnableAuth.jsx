import authImg from '../../assets/images/auth-picture.jpg';
import './styles.css';
import { useSelector } from 'react-redux';
import { Button } from '../settings/domainAuth/authSteps/forms/nextButton';
import { useNavigate } from 'react-router-dom';
import AuthCode from 'react-auth-code-input';
import { useState } from 'react';

export const EnableAuth = () => {
  const userEmail = useSelector((state) => state.user.email);
  console.log(userEmail, 'userEmail');
  const [result, setResult] = useState();
  const handleOnChange = (res) => {
    setResult(res);
  };

  const navigate = useNavigate();

  return (
    <div className={'disable-auth'}>
      <div className={'text-wrapper'}>
        <h1>Security verification</h1>
        <p>
          We have sent a confirmation code to your e-mail address: <b>{userEmail}</b>
        </p>
        {/*<Button*/}
        {/*  onClick={() => {*/}
        {/*    navigate('/settings');*/}
        {/*  }}*/}
        {/*  name={'Back'}*/}
        {/*/>*/}
        <AuthCode
          onChange={handleOnChange}
          containerClassName={'two-factor-input-box'}
          allowedCharacters={'numeric'}
        />
        <span>
          Didn&apos;t get the email? <b>Resend</b>
        </span>
      </div>
      <div className={'img-wrapper'}>
        <img src={authImg} className={'confirmated-img'} />
      </div>
    </div>
  );
};

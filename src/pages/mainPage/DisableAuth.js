import authImg from '../../assets/images/auth-picture.jpg';
import './style.scss';
import { useSelector } from 'react-redux';
import { Button } from '../homePage/settings/domainAuth/authSteps/forms/nextButton';
import { useNavigate } from 'react-router-dom';
import AuthCode from 'react-auth-code-input';
import { useEffect, useState } from 'react';

export const DisableAuth = () => {
  const userEmail = useSelector((state) => state.user.email);
  const [result, setResult] = useState();
  const [savedEmail, setSavedEmail] = useState();

  useEffect(() => {
    // Fetch the saved email from Redux state when the component mounts
    const storedEmail = localStorage.getItem('userEmail');
    console.log(storedEmail, 'storedEmail');
    setSavedEmail(storedEmail);
  }, [savedEmail]);
  const handleOnChange = (res) => {
    setResult(res);
  };
  console.log(userEmail, 'userEmail');
  const navigate = useNavigate();

  return (
    <div className={'enable-auth'}>
      <div className={'text-wrapper'}>
        <h1>Check your inbox</h1>
        <p>
          We have sent an email with instructions to confirm your email address to{' '}
          <b>{savedEmail}</b>
        </p>
        <AuthCode
          onChange={handleOnChange}
          containerClassName={'two-factor-input-box'}
          allowedCharacters={'numeric'}
        />
        {/*<Button*/}
        {/*  onClick={() => {*/}
        {/*    navigate('/settings');*/}
        {/*  }}*/}
        {/*  name={'Back'}*/}
        {/*/>*/}
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

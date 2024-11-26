import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const VerifyPage = () => {
  const enteredEmail = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/loginpage');
  };

  return (
    <div className={'verify'}>
      <div className={'verify-message'}>
        <div className={'inner-text'}>
          <h1 className={'verify-title'}>Email confirmation</h1>
          <p className={'text-verify'}>
            We have sent an email with confirmation link to your email address:
            <span>{enteredEmail}</span>
          </p>
          <h5 className={'resend'}>
            Didn&apos;t get the email? <span onClick={handleNav}>Resend</span>
          </h5>
        </div>
      </div>
      <div className={'img-wrapper'} />
    </div>
  );
};

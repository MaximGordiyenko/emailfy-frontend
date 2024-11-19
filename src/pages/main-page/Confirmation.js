import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyUser } from '../../store/userSlice';
import './style.scss';
import { Button } from '../../components/button/Button';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNav = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const token = window.location.href.split('/').pop();
    console.log(token, 'verify token');
    if (token) {
      dispatch(verifyUser(token)).then((result) => {
        console.log(result, 'verify handler');
      });
    }
  }, []);

  return (
    <div className={'confirm-page'}>
      <div className={'inner-confirm-box'}>
        <div className={'confirm-message'}>
          <h1 className={'confirm-title'}>Email confirmed!</h1>
          <p className={'confirm-text'}>
            Thank you for the registration,
            <br /> please enjoy your <span>Emailfy</span> experience!
          </p>
          <Button onClick={handleNav} isFilled btnText={`Let's roll!`} />
        </div>
      </div>
      <div className={'img-wrapper'} />
    </div>
  );
};

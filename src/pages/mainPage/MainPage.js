import './style.scss';
import { useState } from 'react';
import authImg from '../../assets/images/auth-picture.jpg';
import { RegisterTestForm } from '../../components/registerForm/RegisterTestForm';
import { LoginTestForm } from '../../components/loginForm/LoginTestForm';

export const MainPage = () => {
  const [toggleImg, setToggleImg] = useState(false);
  const [isLeft, setIsLeft] = useState(true);

  const handleToggleImg = () => {
    if (toggleImg === true) {
      setToggleImg(false);
      setIsLeft(true);
    } else {
      setToggleImg(true);
      setIsLeft(false);
    }
  };
  return (
    <div className={'mainpage'}>
      <div className={'main-form-wrapper'}>
        {toggleImg ? (
          <RegisterTestForm onClick={handleToggleImg} toggleImg={toggleImg} />
        ) : (
          <LoginTestForm onClick={handleToggleImg} toggleImg={toggleImg} />
        )}
      </div>
      <div className={'img-wrapper'}>
        {/*<img src={authImg} alt={'auth-img'} className={`authImg`} />*/}
      </div>
    </div>
  );
};

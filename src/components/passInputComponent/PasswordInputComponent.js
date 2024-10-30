// PasswordInputComponent.js
import React, { useState } from 'react';
import './style.scss';
import eye from '../../assets/images/eye.png';
import slasheye from '../../assets/images/eyeslash.png';
const PasswordInputComponent = ({ label, value, onChange, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={'input-pass-box'}>
      <label>{label}</label>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <img
        src={showPassword ? eye : slasheye}
        onClick={handleTogglePassword}
        alt={'tab-show-pass'}
      />
    </div>
  );
};

export default PasswordInputComponent;

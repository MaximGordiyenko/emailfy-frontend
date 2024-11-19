import React from 'react';
import copy from '../../../../../../assets/images/Copy.svg';
import './style.scss';

const InputComponent = ({ placeholderText, labelText }) => {
  const [showToolTip, setShowToolTip] = React.useState(false);

  const copyText = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(placeholderText);
    } else {
      document.execCommand('copy', true, placeholderText);
    }
    setShowToolTip(true);
    setTimeout(() => {
      setShowToolTip(false);
    }, 1000);
  };

  return (
    <div className={'input-wrapper'}>
      <label htmlFor="textInput">{labelText}</label>
      <input
        type="text"
        id="textInput"
        value={placeholderText}
        readOnly
        className={'custom-copy-input'}
      />
      <img onClick={copyText} src={copy} alt="" />
      <div className={`copy-input-success ${showToolTip ? 'show-tooltip' : ''}`}>
        <span>Copied!</span>
      </div>
    </div>
  );
};

export default InputComponent;

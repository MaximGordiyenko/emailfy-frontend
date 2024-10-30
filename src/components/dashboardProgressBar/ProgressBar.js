import React from 'react';
import './style.scss';

const ProgressBar = ({ completed }) => {
  return (
    <div className="progress-bar">
      <div className="filler" style={{ width: `${completed}%` }} />
    </div>
  );
};

export default ProgressBar;

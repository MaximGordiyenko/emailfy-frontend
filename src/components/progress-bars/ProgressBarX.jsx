import React from 'react';
import './styles.css';

const ProgressBarX = ({ completed }) => {
  return (
    <div className="progress-bar">
      <div className="filler" style={{ width: `${completed}%` }} />
    </div>
  );
};

export default ProgressBarX;

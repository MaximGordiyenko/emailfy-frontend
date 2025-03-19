import React, { useState, useEffect } from 'react';
import ProgressBarX from '../../../components/progress-bars/ProgressBarX';
import './styles.css';

const ParentComponent = () => {
  const [completed, setCompleted] = useState([87, 81, 63, 49, 45]);

  return (
    <div className={'pg-component-wrapper'}>
      <div className={'pg-title'}>Top 5 emails with the highest UOR (Unique Open Rate)</div>
      <div className={'bar-box'}>
        {completed.map((val, index) => (
          <div key={index} className={'bar-element'}>
            <div className={'pg-desc'}>
              <div className={'pg-decs-title'}>
                <div className={'type-message'}>Welcome message</div>
                <div className={'date'}>Oct 4th 10:11 AM</div>
              </div>
              <div className={'value'}>{val}%</div>
            </div>
            <ProgressBarX completed={val} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentComponent;

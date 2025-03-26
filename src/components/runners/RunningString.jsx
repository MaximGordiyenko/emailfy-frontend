import React from 'react';
import Marquee from 'react-fast-marquee';
import './styles.css';

export const RunningString = ({ ...props }) => {
  return (
    <div className="running-string">
      <Marquee autoFill={true} {...props}>
        <div className="running-string-item">
          <span>
            {props.children}
          </span>
        </div>
      </Marquee>
    </div>
  );
};

import React from 'react';
import './styles.css';
import letterGreenIcon from '../../assets/images/letter-green.svg';
import letterGreyIcon from '../../assets/images/letter-grey.svg';
import switchersGreenIcon from '../../assets/images/switchers-green.svg';
import switchersGreyIcon from '../../assets/images/switchers-grey.svg';

const AnalyticsTabs = ({ activeTab, onTabClick }) => {
  return (
    <div className="tab-analytics">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => onTabClick('campaigns')}>
          <img src={activeTab === 'campaigns' ? letterGreenIcon : letterGreyIcon} alt="" />
          <span>Email campaigns</span>
        </div>
        <div
          className={`tab ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => onTabClick('tests')}>
          <img src={activeTab === 'tests' ? switchersGreenIcon : switchersGreyIcon} alt="" />
          <span>A/B Tests</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTabs;

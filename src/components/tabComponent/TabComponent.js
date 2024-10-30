// TabComponent.js
import React, { useState } from 'react';
import { UserInfo } from './userInfo/UserInfo';
import { CompanyInfo } from './companyInfo/CompanyInfo';
import { DomainInfo } from './domain/DomainInfo';

const TabComponent = ({ onSave, setOnSave }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="tab-container">
      <div className={'tabs'}>
        <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
          User info
        </div>
        <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
          Company information
        </div>
        <div className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
          Domain
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 1 && <UserInfo onSave={onSave} setOnSave={setOnSave} />}
        {activeTab === 2 && <CompanyInfo onSave={onSave} setOnSave={setOnSave} />}
        {activeTab === 3 && <DomainInfo onSave={onSave} setOnSave={setOnSave} />}
      </div>
    </div>
  );
};

export default TabComponent;

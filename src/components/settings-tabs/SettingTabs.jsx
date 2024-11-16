import { useState } from 'react';
import { UserInformationTab } from './user-info-tab/UserInformationTab';
import { CompanyInformationTab } from './company-info-tab/CompanyInformationTab';
import { DomainInformationTab } from './domain-info-tab/DomainInformationTab';

const SettingTabs = ({ onSave, setOnSave }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="tab-container">
      <div className={'tabs'}>
        <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
          User information
        </div>
        <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
          Company information
        </div>
        <div className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
          Domain
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 1 && <UserInformationTab onSave={onSave} setOnSave={setOnSave} />}
        {activeTab === 2 && <CompanyInformationTab onSave={onSave} setOnSave={setOnSave} />}
        {activeTab === 3 && <DomainInformationTab onSave={onSave} setOnSave={setOnSave} />}
      </div>
    </div>
  );
};

export default SettingTabs;

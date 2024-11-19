import React, { useState } from 'react';
import './styles.css';
import { CampaignsTab } from '../../components/analyticsTabs/campaigns/CampaignsTab';
import { TestsTab } from '../../components/analyticsTabs/tests/TestsTab';
import AnalyticsTabs from '../../components/analyticsTabs/AnalyticsTabs';

export const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return <CampaignsTab />;
      case 'tests':
        return <TestsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="analytics-wrapper">
      <div className="analytics-content">
        <AnalyticsTabs
          activeTab={activeTab}
          onTabClick={setActiveTab}
          tabContent={renderTabContent()}
        />
        <div className="tab-box">{activeTab === 'tests' ? <TestsTab /> : <CampaignsTab />}</div>
      </div>
    </div>
  );
};

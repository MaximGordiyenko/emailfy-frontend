import React, { useState } from 'react';
import './style.scss';
import BrandHeader from '../../../components/header/BrandHeader';
import analyticsIcon from '../../../assets/images/analytic/analytics-outline.svg';
import { CampaignsTab } from '../../../components/analyticsTabs/campaigns/CampaignsTab';
import { TestsTab } from '../../../components/analyticsTabs/tests/TestsTab';
import AnalyticsTabs from '../../../components/analyticsTabs/AnalyticsTabs';

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

  const renderHeaderContent = () => {
    return (
      <button className="compare-btn" disabled>
        <span>Compare</span>
      </button>
    );
  };

  return (
    <div className="analytics-wrapper">
      <BrandHeader icon={analyticsIcon} description={'Analytics'} content={renderHeaderContent()} />
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

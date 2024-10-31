import './style.scss';
import settings from '../../../assets/images/settings.png';
import TabComponent from '../../../components/tabComponent/TabComponent';
import BrandHeader from '../../../components/header/BrandHeader';
import React, { useState } from 'react';

export const SettingsPage = () => {
  const [onSave, setOnSave] = useState(false);

  const renderHeaderContent = () => {
    return (
      <button
        className="save-btn"
        onClick={() => {
          setOnSave(true);
        }}>
        <span>Save changes</span>
      </button>
    );
  };

  return (
    <div className="settings">
      <BrandHeader icon={settings} description="Settings" content={renderHeaderContent()} />
      <div className="settings-content">
        <div className="tabs-wrapper">
          <TabComponent onSave={onSave} setOnSave={setOnSave} />
        </div>
      </div>
    </div>
  );
};

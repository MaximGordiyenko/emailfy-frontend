import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { settingTabs } from './setting.constants';
import './styles.css';

export const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (key) => {
    const tab = settingTabs.find((tab) => tab.key === key);
    if (tab) navigate(tab.path);
  };

  const activeKey = settingTabs.find((tab) => location.pathname.includes(tab.path))?.key || '1';

  return (
    <div className="settings-page-container">
      <Tabs centered items={settingTabs} onChange={onChange} activeKey={activeKey} />
    </div>
  );
};

import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { analyticsTabs } from './analytics.constants';
import './styles.css';

export const AnalyticsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (key) => {
    const tab = analyticsTabs.find((tab) => tab.key === key);
    if (tab) navigate(tab.path);
  };

  const activeKey = analyticsTabs.find((tab) => location.pathname.includes(tab.path))?.key || '1';

  return (
    <div className="analytics-page-conatainer">
      <Tabs centered items={analyticsTabs} onChange={onChange} activeKey={activeKey} />
    </div>
  );
};

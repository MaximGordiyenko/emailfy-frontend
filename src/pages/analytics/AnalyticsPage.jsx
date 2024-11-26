import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { Tabs } from 'antd';
import { ControlOutlined, BugOutlined } from '@ant-design/icons';

import { CampaignsTab } from '../../components/analyticsTabs/campaigns/CampaignsTab';
import { TestsTab } from '../../components/analyticsTabs/tests/TestsTab';
import './styles.css';

export const AnalyticsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const analiticsTabs = [
    {
      key: '1',
      label: 'Email campaigns',
      path: `/${ROUTE.analytics}/${ROUTE.emailCampaign}`,
      children: <CampaignsTab />,
      icon: <ControlOutlined />,
    },
    {
      key: '2',
      label: 'A / B Tests',
      path: `/${ROUTE.analytics}/${ROUTE.aTobTests}`,
      children: <TestsTab />,
      icon: <BugOutlined />,
    },
  ];

  const onChange = (key) => {
    const tab = analiticsTabs.find((tab) => tab.key === key);
    if (tab) navigate(tab.path);
  };

  const activeKey = analiticsTabs.find((tab) => location.pathname.includes(tab.path))?.key || '1';

  return (
    <div className="analytics-page-conatainer">
      <Tabs centered items={analiticsTabs} onChange={onChange} activeKey={activeKey} />
    </div>
  );
};

import { ROUTE } from '../../routes/routes.constants';
import { CampaignsTab } from '../../components/tabs/analytics-tabs/campaigns/CampaignsTab';
import { ControlOutlined, BugOutlined } from '@ant-design/icons';
import { TestsTab } from '../../components/tabs/analytics-tabs/aToBTest/TestsTab';

export const analyticsTabs = [
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

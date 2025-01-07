import { ROUTE } from '../../routes/routes.constants';

import {
  DesktopOutlined,
  LineChartOutlined,
  TeamOutlined,
  SoundOutlined,
  TagsOutlined,
  SettingOutlined,
  SignatureOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export const sidebarRoutes = [
  {
    icon: <DesktopOutlined />,
    label: 'Dashboard',
    path: `/${ROUTE.dashboard}`,
    key: '1',
  },
  {
    icon: <LineChartOutlined />,
    label: 'Analytics',
    path: `/${ROUTE.analytics}/${ROUTE.emailCampaign}`,
    key: '2',
  },
  {
    icon: <TeamOutlined />,
    label: 'Audience',
    path: `/${ROUTE.audiencePage}`,
    key: '3',
  },
  {
    icon: <SoundOutlined />,
    label: 'Campaigns',
    path: `/${ROUTE.campaignsPage}`,
    key: '4',
  },
  {
    icon: <TagsOutlined />,
    label: 'Tags',
    path: `/${ROUTE.tags}`,
    key: '5',
  },
  {
    icon: <SettingOutlined />,
    label: 'Settings',
    path: `/${ROUTE.settings}/${ROUTE.userInfo}`,
    key: '6',
  },
  {
    icon: <SignatureOutlined />,
    label: 'Subscription',
    path: `/${ROUTE.subscription}`,
    key: '7',
  },
];

export const logoutRoute = [
  {
    icon: <LogoutOutlined />,
    label: 'Logout',
    path: `/${ROUTE.login}`,
    key: '1',
  },
];

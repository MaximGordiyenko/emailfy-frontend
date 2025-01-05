import { Link } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { Typography } from 'antd';
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

const { Text } = Typography;

export const sidebarRoutes = [
  {
    icon: <DesktopOutlined />,
    label: (
      <Link to={`/${ROUTE.dashboard}`}>
        <Text>Dashboard</Text>
      </Link>
    ),
    path: `/${ROUTE.dashboard}`,
    key: '1',
  },
  {
    icon: <LineChartOutlined />,
    label: (
      <Link to={`/${ROUTE.analytics}/${ROUTE.emailCampaign}`}>
        <Text>Analytics</Text>
      </Link>
    ),
    path: `/${ROUTE.analytics}`,
    key: '2',
  },
  {
    icon: <TeamOutlined />,
    label: (
      <Link to={`/${ROUTE.audiencePage}`}>
        <Text>Audience</Text>
      </Link>
    ),
    path: `/${ROUTE.audiencePage}`,
    key: '3',
  },
  {
    icon: <SoundOutlined />,
    label: (
      <Link to={`/${ROUTE.campaignsPage}`}>
        <Text>Campaigns</Text>
      </Link>
    ),
    path: `/${ROUTE.campaignsPage}`,
    key: '4',
  },
  {
    icon: <TagsOutlined />,
    label: (
      <Link to={`/${ROUTE.tags}`}>
        <Text>Tags</Text>
      </Link>
    ),
    path: `/${ROUTE.tags}`,
    key: '5',
  },
  {
    icon: <SettingOutlined />,
    label: (
      <Link to={`/${ROUTE.settings}/${ROUTE.userInfo}`}>
        <Text>Settings</Text>
      </Link>
    ),
    path: `/${ROUTE.settings}`,
    key: '6',
  },
  {
    icon: <SignatureOutlined />,
    label: (
      <Link to={`/${ROUTE.subscription}`}>
        <Text>Subscription</Text>
      </Link>
    ),
    path: `/${ROUTE.subscription}`,
    key: '7',
  },
];

export const logoutRoute = [
  {
    icon: <LogoutOutlined />,
    label: <Text>Logout</Text>,
    path: `/${ROUTE.login}`,
    key: '0',
  },
];

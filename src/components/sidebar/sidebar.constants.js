import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { ROUTE } from '../../routes/routes.constants';
import {
  DesktopOutlined,
  LineChartOutlined,
  TeamOutlined,
  SoundOutlined,
  SettingOutlined,
  SignatureOutlined,
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
      <Link to={`/${ROUTE.audience}`}>
        <Text>Audience</Text>
      </Link>
    ),
    path: `/${ROUTE.audience}`,
    key: '3',
  },
  {
    icon: <SoundOutlined />,
    label: (
      <Link to={`/${ROUTE.campaigns}`}>
        <Text>Campaigns</Text>
      </Link>
    ),
    path: `/${ROUTE.campaigns}`,
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

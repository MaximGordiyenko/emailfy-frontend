import { useLocation, useNavigate } from 'react-router-dom';

import { Menu, Layout, theme } from 'antd';
import { logoutRoute, sidebarRoutes } from './sidebar.constants';

import PhraseLooper from '../animations/PhraseLooper';
import { removeToken } from '../../api/API';
import './styles.css';

const { Sider } = Layout;

export const Sidebar = ({ onCollapse, isCollapse, themeBgColor }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const activeKey = sidebarRoutes.find((route) => {
    return location.pathname.startsWith(route.path.split('/').slice(0, 2).join('/'));
  })?.key;

  const onLogout = ({ item }) => {
    removeToken('accessToken');
    removeToken('refreshToken');
    navigate(item);
  };

  return (
    <Sider
      style={{ background: colorBgContainer }}
      trigger={null}
      collapsible
      collapsedWidth={80}
      width={180}
      collapsed={isCollapse}
      onCollapse={(collapsed) => onCollapse(collapsed)} // Keep this for manual toggling
      breakpoint="lg">
      <Menu
        mode="inline"
        inlineIndent={20}
        selectedKeys={[activeKey]}
        items={sidebarRoutes.map((route) => ({
          key: route.key,
          icon: route.icon,
          label: route.label,
          onClick: () => navigate(route.path),
        }))}
      />
      {!isCollapse && <PhraseLooper themeBgColor={themeBgColor} />}
      <Menu
        rootClassName="logout-container"
        inlineIndent={20}
        selectedKeys={[null]}
        items={logoutRoute.map((route) => ({
          key: route.key,
          icon: route.icon,
          label: route.label,
          onClick: () => onLogout(route.path),
        }))}
      />
    </Sider>
  );
};

import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { Menu, Layout, theme } from 'antd';
import { sidebarRoutes, logoutRoute } from './sidebar.constants';

import PhraseLooper from '../animations/PhraseLooper';
import { removeToken } from '../../api/API';
import './styles.css';

const { Sider } = Layout;

export const Sidebar = ({ sidebarWidth, onCollapse, isCollapse, themeBgColor }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const activeKey = sidebarRoutes.find((route) => {
    return location.pathname.startsWith(route.path);
  })?.key;

  const onLogout = () => {
    removeToken('accessToken');
    removeToken('refreshToken');
    navigate(`/${ROUTE.login}`);
  };

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        paddingTop: 80,
        background: colorBgContainer,
      }}
      trigger={null}
      collapsible
      collapsedWidth={80}
      width={200}
      collapsed={isCollapse} // Explicitly pass isCollapse
      onCollapse={(collapsed) => onCollapse(collapsed)} // Keep this for manual toggling
      breakpoint="lg">
      <Menu mode="inline" items={sidebarRoutes} selectedKeys={[activeKey]} />
      {!isCollapse && <PhraseLooper themeBgColor={themeBgColor} />}
      <Menu
        mode="vertical"
        rootClassName="logout-container"
        items={logoutRoute}
        selectedKeys={[null]}
        onClick={onLogout}
      />
    </Sider>
  );
};

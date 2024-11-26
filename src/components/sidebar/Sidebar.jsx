import { useLocation } from 'react-router-dom';
import { Menu, Layout, theme } from 'antd';
import { sidebarRoutes } from './sidebar.constants';
import './styles.css';

const { Sider } = Layout;

export const Sidebar = ({ onCollapse }) => {
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const activeKey = sidebarRoutes.find((route) => {
    console.log('location', location.pathname.startsWith(route.path));
    console.log('route', route.path);
    return location.pathname.startsWith(route.path);
  })?.key;
  console.log(activeKey);
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
      onCollapse={(collapsed) => onCollapse(collapsed)}
      breakpoint="lg">
      <Menu mode="inline" items={sidebarRoutes} selectedKeys={[activeKey]} />
    </Sider>
  );
};

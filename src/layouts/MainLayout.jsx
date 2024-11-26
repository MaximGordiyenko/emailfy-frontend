import { useState } from 'react';
import { Layout, theme } from 'antd';

import { Outlet } from 'react-router-dom';
import { MainProvider } from '../context/MainContext';

import { Sidebar } from '../components/sidebar/Sidebar';
import { Head } from '../components/header/Header';
import { AppFooter } from '../components/footer/AppFooter';
import './styles.css';

const { Content } = Layout;

export const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 100 : 220;

  return (
    <MainProvider>
      <Layout>
        <Sidebar onCollapse={setIsCollapsed} />
        <Layout>
          <Head isCollapsed={isCollapsed} />
          <Content
            style={{
              margin: `24px 20px 24px ${sidebarWidth}px`,
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </Content>
          <AppFooter sidebarWidth={sidebarWidth} />
        </Layout>
      </Layout>
    </MainProvider>
  );
};

import { useState, useEffect } from 'react';
import { MainProvider } from '../context/MainContext';

import { Layout, theme } from 'antd';

import { Outlet, useLocation } from 'react-router-dom';

import { Sidebar } from '../components/sidebar/Sidebar';
import { Head } from '../components/header/Header';
import { AppFooter } from '../components/footer/AppFooter';
import './styles.css';

const { Content } = Layout;

export const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { pathname } = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 100 : 220;
  console.log(isCollapsed);
  useEffect(() => {
    // Automatically collapse sidebar for "mail-builder-page"
    if (pathname.includes('mail-builder-page')) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [pathname]);

  return (
    <MainProvider>
      <Layout rootClassName="main-layout">
        <Sidebar
          sidebarWidth={sidebarWidth}
          onCollapse={setIsCollapsed}
          isCollapse={isCollapsed}
          themeBgColor={colorBgContainer}
        />
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

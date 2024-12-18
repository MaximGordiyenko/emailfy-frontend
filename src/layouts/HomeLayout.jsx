import { Breadcrumb, Layout, theme, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import './styles.css';

const { Content } = Layout;

export const HomeLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout rootClassName="home-layout">
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[
            {
              title: (
                <Flex justify="space-between" align="center">
                  <div className={'header-icon'}>
                    <HomeOutlined style={{ margin: '0 6px' }} />
                  </div>
                  <div className={'header-path'}>Home Page</div>
                </Flex>
              ),
            },
          ]}
        />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

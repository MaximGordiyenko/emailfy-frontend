import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants.js';

import { Layout, Breadcrumb, Flex, theme } from 'antd';

import { useBreadcrumbsContent } from '../../hooks/useBreadcrumbsContent.jsx';
import { useBreadcrumbsPath } from '../../hooks/useBreadcrumbsPath.jsx';

import { BrandLogo } from '../logo/BrandLogo.jsx';
import { getHeaderConfigs } from './header.constants.jsx';

import './styles.css';

const { Header } = Layout;

export const Head = ({ isCollapsed }) => {
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  
  const headerConfigs = getHeaderConfigs(navigate);
  
  const { icon, content } = useBreadcrumbsContent(headerConfigs);
  const { path } = useBreadcrumbsPath(headerConfigs);
  
  return (
    <Header style={{ background: colorBgContainer }}>
      {isCollapsed ? (
        <BrandLogo link={`/${ROUTE.home}`} isCollapsed={isCollapsed}/>
      ) : (
        <BrandLogo link={`/${ROUTE.home}`}/>
      )}
      <Flex justify="space-between" align="center">
        <Breadcrumb
          items={[
            {
              title: (
                <Flex justify="space-between" align="center">
                  <div className={'header-icon'}>{icon}</div>
                  <div className={'header-path'}>{path}</div>
                </Flex>
              )
            }
          ]}
        />
        <div className={'header-content'}>{content()}</div>
      </Flex>
    </Header>
  );
};

import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../context/MainContext';

import { Layout, Breadcrumb, Flex, theme } from 'antd';

import { useBreadcrumbsContent } from '../../hooks/useBreadcrumbsContent';
import { useBreadcrumbsPath } from '../../hooks/useBreadcrumbsPath';

import { BrandLogo } from '../logo/BrandLogo';
import { getHeaderConfigs } from './header.constants';

import './styles.css';
import { ROUTE } from '../../routes/routes.constants';

const { Header } = Layout;

export const Head = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const { isOpenMenu, setIsOpenMenu, emailCampaignStep, setEmailCampaignStep } = useMainContext();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const headerConfigs = getHeaderConfigs(
    navigate,
    isOpenMenu,
    setIsOpenMenu,
    emailCampaignStep,
    setEmailCampaignStep,
  );

  const { icon, content } = useBreadcrumbsContent(headerConfigs);
  const { path } = useBreadcrumbsPath(headerConfigs);

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: colorBgContainer,
      }}>
      {!isCollapsed && <BrandLogo link={`/${ROUTE.home}`} />}
      <Flex justify="space-between" align="center">
        <Breadcrumb
          items={[
            {
              title: (
                <Flex justify="space-between" align="center">
                  <div className={'header-icon'}>{icon}</div>
                  <div className={'header-path'}>{path}</div>
                </Flex>
              ),
            },
          ]}
        />
        <div className={'header-content'}>{content()}</div>
      </Flex>
    </Header>
  );
};

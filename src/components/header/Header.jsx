import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../context/MainContext';

import { Layout, Breadcrumb, Flex, theme } from 'antd';

import { useBreadcrumbsContent } from '../../hooks/useBreadcrumbsContent';
import { useBreadcrumbsPath } from '../../hooks/useBreadcrumbsPath';

import { Logo } from '../logo/Logo';
import { getHeaderConfigs } from './header.constants';

import './styles.css';

const { Header } = Layout;

export const Head = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { isOpenMenu, setIsOpenMenu, emailCampaignStep, setEmailCampaignStep } = useMainContext();

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
      {!isCollapsed && <Logo />}
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

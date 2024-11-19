import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../context/MainContext';

import { useBreadcrumbsContent } from '../../hooks/useBreadcrumbsContent';
import { useBreadcrumbsPath } from '../../hooks/useBreadcrumbsPath';

import { getHeaderConfigs } from './header.constants';

import './styles.css';

export const Header = () => {
  const navigate = useNavigate();

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
    <header className={'header-wrapper'}>
      <div className={'header-container'}>
        <div className={'header-route'}>
          <img src={icon} alt={icon} className={'header-icon'} />
          <div className={'header-path'}>{path}</div>
        </div>
        <div className={'header-content'}>{content()}</div>
      </div>
    </header>
  );
};

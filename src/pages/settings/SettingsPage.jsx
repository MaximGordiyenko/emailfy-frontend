import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { DomainInformationTab } from '../../components/settings-tabs/domain-info-tab/DomainInformationTab';
import { CompanyInformationTab } from '../../components/settings-tabs/company-info-tab/CompanyInformationTab';
import { UserInformationTab } from '../../components/settings-tabs/user-info-tab/UserInformationTab';

import './styles.css';

export const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      number: 1,
      title: 'User information',
      path: `/${ROUTE.settings}/${ROUTE.userInfo}`,
      component: UserInformationTab,
    },
    {
      number: 2,
      title: 'Company information',
      path: `/${ROUTE.settings}/${ROUTE.companyInfo}`,
      component: CompanyInformationTab,
    },
    {
      number: 3,
      title: 'Domain information',
      path: `/${ROUTE.settings}/${ROUTE.domainInfo}`,
      component: DomainInformationTab,
    },
  ];

  const getActiveTabNumber = () => {
    const activeTab = tabs.find((tab) => location.pathname === tab.path);
    return activeTab ? activeTab.number : 1;
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="tab-container">
      <div className={'tabs'}>
        {tabs.map((tab) => (
          <div
            key={tab.path}
            className={`tab ${getActiveTabNumber() === tab.number ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.path)}>
            {tab.title}
          </div>
        ))}
      </div>

      {location.pathname === `/${ROUTE.settings}}` && (
        <Navigate to={`/${ROUTE.settings}/${ROUTE.userInfo}`} replace />
      )}

      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

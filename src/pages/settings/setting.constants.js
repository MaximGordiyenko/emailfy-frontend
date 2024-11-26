import { UserOutlined, ShopOutlined, UngroupOutlined } from '@ant-design/icons';
import { ROUTE } from '../../routes/routes.constants';
import { UserInformationTab } from '../../components/tabs/user-info-tab/UserInformationTab';
import { CompanyInformationTab } from '../../components/tabs/company-info-tab/CompanyInformationTab';
import { DomainInformationTab } from '../../components/tabs/domain-info-tab/DomainInformationTab';

export const settingTabs = [
  {
    key: '1',
    label: 'User information',
    path: `/${ROUTE.settings}/${ROUTE.userInfo}`,
    children: <UserInformationTab />,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: 'Company information',
    path: `/${ROUTE.settings}/${ROUTE.companyInfo}`,
    children: <CompanyInformationTab />,
    icon: <ShopOutlined />,
  },
  {
    key: '3',
    label: 'Domain information',
    path: `/${ROUTE.settings}/${ROUTE.domainInfo}`,
    children: <DomainInformationTab />,
    icon: <UngroupOutlined />,
  },
];

import dashboardIcon from '../../assets/images/dashboard/db-outline-dark-icon.svg';
import dashboardActiveIcon from '../../assets/images/dashboard/db-filled-white-icon.svg';
import analyticsIcon from '../../assets/images/analytic/analytics-outline.svg';
import analyticsActiveIcon from '../../assets/images/analytics-filled.svg';
import audienceIcon from '../../assets/images/audience-outline.svg';
import audienceActiveIcon from '../../assets/images/audience-filled.svg';
import campaignsIcon from '../../assets/images/campaigns-outline.svg';
import campaignsActiveIcon from '../../assets/images/campaigns-filled.svg';
import settingsIcon from '../../assets/images/settings-outline.svg';
import settingsActiveIcon from '../../assets/images/settings-filled.svg';
import { ROUTE } from '../../routes/routes.constants';

export const sidebarRoutes = [
  {
    img: dashboardIcon,
    img2: dashboardActiveIcon,
    title: 'Dashboard',
    path: `/${ROUTE.dashboard}`,
    id: 1,
  },
  {
    img: analyticsIcon,
    img2: analyticsActiveIcon,
    title: 'Analytics',
    path: `/${ROUTE.analytics}`,
    id: 2,
  },
  {
    img: audienceIcon,
    img2: audienceActiveIcon,
    title: 'Audience',
    path: `/${ROUTE.audience}`,
    id: 3,
  },
  {
    img: campaignsIcon,
    img2: campaignsActiveIcon,
    title: 'Campaigns',
    path: `/${ROUTE.campaigns}`,
    id: 5,
  },
  {
    img: settingsIcon,
    img2: settingsActiveIcon,
    title: 'Settings',
    path: `/${ROUTE.settings}`,
    id: 6,
  },
  {
    img: settingsIcon,
    img2: settingsActiveIcon,
    title: 'Subscription',
    path: `/${ROUTE.subscription}`,
    id: 6,
  },
];

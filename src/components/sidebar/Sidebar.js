import './style.scss';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import settingsIcon from '../../assets/images/settings-outline.svg';
import audienceIcon from '../../assets/images/audience-outline.svg';
import dashboardIcon from '../../assets/images/dashboard-outline.svg';
import campaignsIcon from '../../assets/images/campaigns-outline.svg';
import analyticsIcon from '../../assets/images/analytics-outline.svg';

import audienceActiveIcon from '../../assets/images/audience-filled.svg';
import dashboardActiveIcon from '../../assets/images/dashboard-filled.svg';
import campaignsActiveIcon from '../../assets/images/campaigns-filled.svg';
import settingsActiveIcon from '../../assets/images/settings-filled.svg';
import analyticsActiveIcon from '../../assets/images/analytics-filled.svg';

import logo from '../../assets/images/logoRedesigned.png';
// import wallet from '../../assets/images/Compaigns/Bold/Money/Wallet 2.svg';
// import currency from '../../assets/images/Compaigns/Union.svg';
import stars from '../../assets/images/Compaigns/Bold/Weather/Stars.svg';
import { Logout } from '../logoutPopup/Logout';
import { clearFields } from '../../store/campaignSlice';
import { useDispatch } from 'react-redux';

const sidebarItems = [
  {
    img: dashboardIcon,
    img2: dashboardActiveIcon,
    title: 'Dashboard',
    path: '/dashboard',
    id: 1,
  },
  {
    img: analyticsIcon,
    img2: analyticsActiveIcon,
    title: 'Analytics',
    path: '/analytics',
    id: 2,
  },
  {
    img: audienceIcon,
    img2: audienceActiveIcon,
    title: 'Audience',
    path: '/audience',
    id: 3,
  },
  // { img: img5, img2: img10, title: 'Tags', path: '/tags', id: 4 },
  {
    img: campaignsIcon,
    img2: campaignsActiveIcon,
    title: 'Campaigns',
    path: '/campaigns',
    id: 5,
  },
  {
    img: settingsIcon,
    img2: settingsActiveIcon,
    title: 'Settings',
    path: '/settings',
    id: 6,
  },
];

export const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const activePath = location.pathname ? { background: '#7E9D00', borderRadius: '10px' } : null;

  useEffect(() => {
    setShowSideBar(!location.pathname.includes('/mail-builder-page'));
    const isClearCampaignFrom = sidebarItems.some((el) => el.path.includes(location.pathname));

    if (isClearCampaignFrom) {
      dispatch(
        clearFields([
          'campaign_name',
          'subject',
          'from_name',
          'from_email',
          'sendTo',
          'html',
          'campaign_text',
        ]),
      );
    }
  }, [location]);

  const handleNav = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_2fa');
    navigate('/loginpage', { replace: true });
  };

  return showSideBar ? (
    <div className="sidebar-wrapper">
      <div className="upper-box">
        <div className="side-logo">
          <img src={logo} alt="side-logo" />
        </div>
        {/*<div className={'balance'}>*/}
        {/*  <img src={wallet} alt={'sidebar-wallet'} />*/}
        {/*  <div className={'count-balance'}>*/}
        {/*    <img src={currency} alt={'sidebar-currency'} />*/}
        {/*    <span>2800.00</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {sidebarItems.map((item, index) => {
          const isCurrPath = location.pathname.includes(item.path);
          return (
            <Link to={item.path} key={index} style={isCurrPath ? activePath : null}>
              <img
                style={
                  isCurrPath
                    ? { visibility: 'visible' }
                    : { visibility: 'hidden', height: 0, width: 0 }
                }
                src={item.img2}
                alt={''}
              />
              <img
                style={
                  !isCurrPath
                    ? { visibility: 'visible' }
                    : { visibility: 'hidden', height: 0, width: 0 }
                }
                src={item.img}
                alt={''}
              />
              <span style={isCurrPath ? { color: '#FFFFFF' } : null}>{item.title}</span>
            </Link>
          );
        })}
      </div>
      <div className={'lower-tabs'}>
        <div className={'upgrade-plan'}>
          <img src={stars} alt={'sidebar-stars'} />
          <div className={'sidebar-up-plane'}>
            <span className={'up-plan-span'}>Upgrade plan</span>
            <p className={'up-plan-text'}>Get the most out of Emailfy</p>
          </div>
        </div>
        <Logout onLogout={handleNav} />
      </div>
    </div>
  ) : null;
};

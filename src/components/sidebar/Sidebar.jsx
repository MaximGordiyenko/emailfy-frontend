import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// import { useDispatch } from 'react-redux';
// import { clearFields } from '../../store/campaignSlice';

import logo from '../../assets/images/logoRedesigned.png';
import stars from '../../assets/images/compaigns/Stars.svg';

import { Logout } from '../../pages/auth-page/Logout';
import { sidebarRoutes } from './sidebar.constants';
import './styles.css';

export const Sidebar = () => {
  const location = useLocation();
  // const dispatch = useDispatch();

  const activePath = location.pathname ? { background: '#7E9D00', borderRadius: '10px' } : null;

  useEffect(() => {
    const isClearCampaignFrom = sidebarRoutes.some((el) => el.path.includes(location.pathname));

    if (isClearCampaignFrom) {
      // dispatch(
      //   clearFields([
      //     'campaign_name',
      //     'subject',
      //     'from_name',
      //     'from_email',
      //     'sendTo',
      //     'html',
      //     'campaign_text',
      //   ]),
      // );
    }
  }, [location]);

  return (
    <aside className="sidebar-container">
      <div className="side-logo">
        <img src={logo} alt="side-logo" />
      </div>
      {sidebarRoutes.map((item, index) => {
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
    </aside>
  );
};

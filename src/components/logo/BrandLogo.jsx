import { Link, useLocation } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants.js';

import { Typography } from 'antd';

import './styles.css';

const { Title } = Typography;

export const BrandLogo = ({ isCollapsed, link, center = false }) => {
  const { pathname } = useLocation();
  
  const resizeText = pathname === `/${ROUTE.login}` || pathname === `/${ROUTE.registration}`;
  
  return (
    <>
      {isCollapsed ? (
        <img src={`https://res.cloudinary.com/maxigord/image/upload/v1745582121/Mailfly/MailFly_logo.png`}
             alt="brand-logo"
             className="logo-image"
        />
      ) : (
        <Link to={link} className="logo-link-container" style={{ justifyContent: center ? 'center' : 'flex-start' }}>
          <img src={`https://res.cloudinary.com/maxigord/image/upload/v1745582121/Mailfly/MailFly_logo.png`}
               alt="brand-logo"
               className="logo-image-animated"
          />
          <Title level={resizeText ? 2 : 3} type="secondary" className="logo-text">
            MailFly
          </Title>
        </Link>
      )}
    </>
  );
};

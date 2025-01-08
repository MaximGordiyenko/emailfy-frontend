import { Link, useLocation } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants.js';

import { Typography } from 'antd';

import logo from '../../assets/images/logo_calibri.png';
import './styles.css';

const { Title } = Typography;

export const BrandLogo = ({ isCollapsed, link }) => {
  const { pathname } = useLocation();

  const resizeText = pathname === `/${ROUTE.login}` || pathname === `/${ROUTE.registration}`;

  return (
    <>
      {isCollapsed ? (
        <img src={logo} alt="brand-logo" className="logo-image" />
      ) : (
        <Link to={link} className="logo-link-container">
          <Title level={resizeText ? 2 : 3} type="secondary">
            E
          </Title>
          <Title level={resizeText ? 2 : 3} type="secondary">
            mail
          </Title>
          <img src={logo} alt="brand-logo" className="logo-image-animated" />
          <Title level={resizeText ? 2 : 3} type="secondary">
            Fly
          </Title>
        </Link>
      )}
    </>
  );
};

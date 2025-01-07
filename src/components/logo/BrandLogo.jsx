import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import logo from '../../assets/images/dinoLogo.png';
import './styles.css';

const { Title } = Typography;

export const BrandLogo = ({ isCollapsed, link }) => {
  return (
    <>
      {isCollapsed ? (
        <img src={logo} alt="brand-logo" className="logo-image" />
      ) : (
        <Link to={link} className="logo-link-container">
          <Title level={2} type="secondary">
            Email
          </Title>
          <img src={logo} alt="brand-logo" className="logo-image-animated" />
          <Title level={2} type="secondary">
            ly
          </Title>
        </Link>
      )}
    </>
  );
};

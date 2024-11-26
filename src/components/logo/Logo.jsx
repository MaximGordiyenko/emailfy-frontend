import { Link } from 'react-router-dom';
import { ROUTE } from '../../routes/routes.constants';

import { Typography } from 'antd';

import logo from '../../assets/images/dinoLogo.png';
import './styles.css';

const { Title } = Typography;

export const Logo = () => {
  return (
    <Link to={`/${ROUTE.home}`} className="logo-link-container">
      <Title level={2} type="secondary">
        Email
      </Title>
      <img src={logo} alt="avanat-logo" className="logo-image" />
      <Title level={2} type="secondary">
        ly
      </Title>
    </Link>
  );
};

import { Link } from 'react-router-dom';

import { Typography, Image } from 'antd';

import logo from '../../assets/images/dinoLogo.png';
import './styles.css';

const { Title } = Typography;

export const BrandLogo = ({ link }) => {
  return (
    <Link to={link} className="logo-link-container">
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

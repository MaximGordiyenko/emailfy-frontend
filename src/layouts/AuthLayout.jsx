import { Outlet, useLocation } from 'react-router-dom';
import { ROUTE } from '../routes/routes.constants.js';
import { Card, Flex } from 'antd';
import './styles.css';

export const AuthLayout = () => {
  const location = useLocation();
  
  const reversLayout = location.pathname === `/${ROUTE.login}` ? 'login-layout' : 'register-layout';
  
  return (
    <Card hoverable>
      <Flex className={`${reversLayout}`}>
        <div className="auth-layout-image-wrapper">
          <img alt="avatar"
               src={`https://res.cloudinary.com/maxigord/image/upload/v1745584494/Mailfly/BrandImg_lzdiol.png`}
               className="auth-layout-image"/>
        </div>
        <Outlet/>
      </Flex>
    </Card>
  );
};

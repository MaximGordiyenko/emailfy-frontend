import { Outlet, useLocation } from 'react-router-dom';
import { ROUTE } from '../routes/routes.constants';
import './styles.css';

export const AuthLayout = () => {
  const location = useLocation();

  const reversLayout = location.pathname === `/${ROUTE.login}` ? ' revers-layout' : '';

  return (
    <div className={`auth-layout-container${reversLayout}`}>
      <div className={'auth-layout-form'}>
        <Outlet />
      </div>
      <div className={'auth-layout-img'} />
    </div>
  );
};

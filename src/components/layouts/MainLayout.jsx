import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';

export const MainLayout = () => {
  return (
    <div className={'main-layout-container'}>
      <Sidebar />
      <div className={'main-layout-content'}>
        <Outlet />
      </div>
    </div>
  );
};

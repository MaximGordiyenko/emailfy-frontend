import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <div className="default-layout-container">
      <Outlet />
    </div>
  );
};

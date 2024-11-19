import { Outlet } from 'react-router-dom';

import { MainProvider } from '../../context/MainContext';

import { Sidebar } from '../sidebar/Sidebar';
import { Header } from '../header/Header';
import './styles.css';

export const MainLayout = () => {
  return (
    <MainProvider>
      <div className={`main-layout-container`}>
        <Sidebar />
        <div className={`main-layout-header`}>
          <Header />
          <div className={`main-layout-outlet-content`}>
            <Outlet />
          </div>
        </div>
      </div>
    </MainProvider>
  );
};

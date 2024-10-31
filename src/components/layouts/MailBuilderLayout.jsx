import { Outlet } from 'react-router-dom';
import { PreviewBuilderHeader } from '../header/PreviewBuilderHeader';
import './styles.css';

export const MailBuilderLayout = () => {
  return (
    <div className="mail-builder-layout">
      <PreviewBuilderHeader />
      <Outlet />
    </div>
  );
};

import { Outlet } from 'react-router-dom';
import { PreviewBuilderHeader } from '../components/header/PreviewBuilderHeader';
import './styles.css';
import { MailBuilderProvider } from '../context/MailBuilderContext';

export const MailBuilderLayout = () => {
  return (
    <MailBuilderProvider>
      <div className="mail-builder-layout">
        <PreviewBuilderHeader />
        <Outlet />
      </div>
    </MailBuilderProvider>
  );
};

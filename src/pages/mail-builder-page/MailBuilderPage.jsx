import { MailBuilderProvider } from '../../context/MailBuilderContext';
import { Outlet } from 'react-router-dom';
import './styles.css';

export const MailBuilderPage = () => {
  return (
    <MailBuilderProvider>
      <Outlet />
    </MailBuilderProvider>
  );
};

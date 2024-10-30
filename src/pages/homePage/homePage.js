import { useEffect } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './style.scss';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard');
  }, []);
  return (
    <div className={'homepage'}>
      <Navbar />
      <Sidebar />
    </div>
  );
};

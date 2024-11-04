import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTE } from './routes.constants';

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  useEffect(() => {
    const accessToken = authToken();
    if (!accessToken) {
      navigate(`/${ROUTE.login}`, { replace: true });
    }
  }, [authToken, navigate]);

  const accessToken = authToken();
  if (!accessToken) {
    return <Navigate to={`/${ROUTE.login}`} replace />;
  }
  return children;
};

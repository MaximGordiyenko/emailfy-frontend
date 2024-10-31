import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../api/auth/auth';
import { AuthLayout } from '../layouts/AuthLayout';

const PrivateRoute = ({ element }) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const access_token = await getAccessToken();
      if (access_token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        navigate('/signIn');
      }
    })();
  }, []);

  return <>{isLogged ? element : <AuthLayout />}</>;
};

export default PrivateRoute;

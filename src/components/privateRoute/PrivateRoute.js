import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../api/auth/auth';
import { MainPage } from '../../pages/mainPage/MainPage';

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
        navigate('/loginpage');
      }
    })();
  }, []);

  return <>{isLogged ? element : <MainPage />}</>;
};

export default PrivateRoute;

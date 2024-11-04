import { createContext, useContext } from 'react';
import { ROUTE } from '../routes/routes.constants';
import { setToken, removeToken, getToken } from '../api/API';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const login = (token, navigate) => {
    setToken('accessToken', token);
    navigate(`/${ROUTE.dashboard}`);
  };

  const logout = (navigate) => {
    removeToken('accessToken');
    navigate(`/${ROUTE.login}`);
  };

  const authToken = () => {
    return getToken('accessToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

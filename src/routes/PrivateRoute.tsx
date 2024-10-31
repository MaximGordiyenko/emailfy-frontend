import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

interface PrivateRouteProps {
  children?: any;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  const { token } = useSelector((state) => state.account);

  // Check if the user is authenticated
  if (!token) {
    // If no token, redirect to signin page
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // Otherwise, render the requested route/component
  return children;
};

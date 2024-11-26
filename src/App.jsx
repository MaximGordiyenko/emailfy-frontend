import { RouterProvider } from 'react-router';
import { routes } from './routes/routes';

import { QueryClientProvider } from 'react-query';

import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { ConfigProvider, theme } from 'antd';
import { themeX, queryClient } from './app.constants';
import './styles.css';

export const App = () => {
  const { isDarkMode } = useTheme();

  const currentTheme = {
    algorithm: isDarkMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
    ...themeX,
  };

  return (
    <>
      <ConfigProvider theme={currentTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={routes} />
          </AuthProvider>
        </QueryClientProvider>
      </ConfigProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        theme="dark"
      />
    </>
  );
};

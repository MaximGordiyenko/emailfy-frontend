import { RouterProvider } from 'react-router';
import { routes } from './routes/routes';

import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

import { ConfigProvider, theme } from 'antd';
import { themeX, queryClient } from './app.constants';

export const App = () => {
  const { isDarkMode } = useTheme();

  const currentTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    ...themeX,
  };

  return (
    <ConfigProvider theme={currentTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

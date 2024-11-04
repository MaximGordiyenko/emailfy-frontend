import { RouterProvider } from 'react-router';
import { routes } from './routes/routes';

import { QueryClientProvider, QueryClient } from 'react-query';

import { MailBuilderProvider } from './context/MailBuilderContext';
import { AuthProvider } from './context/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //If "always", the query will always re-fetch in the background on window focus
      refetchOnmount: false, //If true, the query will re-fetch on mount if the cached data is stale
      refetchOnReconnect: false, //If true, the query will re-fetch on reconnect if the cached data is stale
      retry: 2, //If set to a number, failed queries will retry until the failed query count reaches that number.
      staleTime: 10000, //The time in milliseconds after which data will be cached for 10 seconds.
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MailBuilderProvider>
          <AuthProvider>
            <RouterProvider router={routes} />
          </AuthProvider>
        </MailBuilderProvider>
      </QueryClientProvider>
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
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import store from './store';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
);

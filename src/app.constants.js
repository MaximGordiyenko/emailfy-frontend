import { QueryClient } from 'react-query';

export const themeX = {
  components: {
    Button: {
      colorPrimary: '#7E9D00',
      colorPrimaryHover: '#A5BB4D',
    },
    Input: {
      colorPrimary: '#7E9D00',
      activeShadow: '#7E9D00',
      hoverBorderColor: '#A5BB4D',
    },
    Switch: {
      colorPrimary: '#7E9D00',
      handleBg: '#2A2B3B',
      colorPrimaryHover: '#6A6B76',
      handleSize: 32,
      trackHeight: 36,
      innerMinMargin: 0,
    },
    Typography: {
      colorLink: '#7E9D00',
      colorLinkHover: '#A5BB4D',
    },
    Menu: {
      itemSelectedColor: '#7E9D00',
    },
    Divider: {
      colorSplit: '#7E9D00',
    },
    Tabs: {
      inkBarColor: '#A5BB4D',
      itemHoverColor: '#A5BB4D',
      itemSelectedColor: '#A5BB4D',
      lineWidthBold: 2,
    },
  },
};

export const queryClient = new QueryClient({
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

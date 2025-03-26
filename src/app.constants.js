import { QueryClient } from '@tanstack/react-query';

export const themeX = {
  components: {
    Button: {
      colorPrimary: '#7E9D00',
      colorPrimaryHover: '#A5BB4D',
      defaultHoverBorderColor: '#7E9D00',
    },
    Rate: {},
    Form: {
      labelColor: '#7E9D00',
    },
    Input: {
      colorPrimary: '#7E9D00',
      activeShadow: '#7E9D00',
      hoverBorderColor: '#A5BB4D',
    },
    Checkbox: {
      colorPrimary: '#7E9D00',
      colorPrimaryHover: '#A5BB4D',
    },
    Table: {
      // filterDropdownBg: '#7E9D00',
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
      // titleMarginTop: 0,
      // colorText: '#7E9D00',
    },
    Menu: {
      itemSelectedColor: '#FFF',
      // itemColor: '#098aaa',
      // itemHoverColor: '#098aaa',
      itemMarginInline: 12,
      itemSelectedBg: '#7E9D00',
      // popupBg: '#FFF',
      itemHeight: 55,
      iconSize: 16,
      collapsedIconSize: 18,
      // fontSize: 16,
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
    Select: {
      activeBorderColor: '#7E9D00',
      hoverBorderColor: '#A5BB4D',
      optionActiveBg: '#7E9D00',
      optionSelectedBg: '#AAAAB1',
    },
    Statistic: {
      titleFontSize: 15,
    },
    Global: {
      borderColor: '#7E9D00',
    },
  },
};

export const modelAIOptions = [
  { value: 'gemini-pro', label: '2.0 Pro' },
  { value: 'gemini-2.0-flash', label: '2.0 Flash' },
  { value: 'gemini-2.0-flash-lite', label: '2.0 Flash Light' },
  { value: 'gemini-1.5-pro', label: '1.5 Pro' },
  { value: 'gemini-1.5-flash', label: '1.5 Flash' },
]

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

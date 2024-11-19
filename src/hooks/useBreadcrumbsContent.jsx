import { useLocation } from 'react-router-dom';

export const useBreadcrumbsContent = (headerConfigs) => {
  const location = useLocation();
  const currentConfig = headerConfigs[location.pathname] || headerConfigs.default;

  return {
    icon: currentConfig.icon,
    content: currentConfig.content,
  };
};

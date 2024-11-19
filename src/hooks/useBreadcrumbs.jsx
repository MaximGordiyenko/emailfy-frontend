import { useLocation } from 'react-router-dom';

export const UseBreadcrumbs = (headerConfigs) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathNames = location.pathname.split('/').filter((x) => x);
    let breadcrumbPath = '';

    return pathNames.map((name, index) => {
      breadcrumbPath += `/${name}`;
      const config = headerConfigs[breadcrumbPath] || headerConfigs.default;
      const isLast = index === pathNames.length - 1;

      return (
        <span key={breadcrumbPath}>
          {index > 0 && ' / '}
          <span
            style={{
              fontWeight: isLast ? 'bold' : 'normal',
              color: isLast ? '#000' : '#666',
            }}>
            {config.description}
          </span>
        </span>
      );
    });
  };

  const currentConfig = headerConfigs[location.pathname] || headerConfigs.default;

  return {
    breadcrumbs: getBreadcrumbs(),
    icon: currentConfig.icon,
    content: currentConfig.content,
  };
};

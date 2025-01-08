import { useLocation, Link } from 'react-router-dom';
import './styles.css';
import { ROUTE } from '../routes/routes.constants.js';

export const useBreadcrumbsPath = (headerConfigs) => {
  const { pathname } = useLocation();

  const getBreadcrumbs = () => {
    let localPath = '';
    const pathNames = pathname.split('/').filter((x) => x);

    return pathNames?.map((name, idx) => {
      localPath += `/${name}`;

      const config = headerConfigs[localPath] || headerConfigs.default || { description: name };
      const isLast = idx === pathNames.length - 1;

      return (
        <span key={localPath} className={'breadcrumbs-path-container'}>
          {idx > 0 && ' / '}
          {isLast ? (
            <span className={'breadcrumbs-path-description'}>{config.description}</span>
          ) : (
            <Link to={localPath} className={'breadcrumbs-path-link'}>
              {config.description}
            </Link>
          )}
        </span>
      );
    });
  };

  return { path: getBreadcrumbs() };
};

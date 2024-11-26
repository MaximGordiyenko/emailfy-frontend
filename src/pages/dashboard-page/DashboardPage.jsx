import { useNavigate } from 'react-router-dom';

import { useQuery } from 'react-query';
import { removeToken } from '../../api/API';
import { getDashboardData } from '../../api/dashboard/dashboard';

import { LoadingSpinner } from '../../components/loader/LoadingSpinner';

import { OverallStatistics } from './overall/OverallStatistics';
import noStatsDashboard from '../../assets/images/dashboard/Frame 980740.svg';

import './styles.css';

export const DashboardPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery('dashboardData', getDashboardData, {
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {
      if (error.response?.status === 401) {
        removeToken('accessToken');
        removeToken('refreshToken');
        window.location.href = '/login';
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const onClickButton = () => {
    navigate('/campaigns');
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-content">
        {/*{myData?.length ? (*/}
        {/*<OverallStatistics />*/}
        {/*) : (*/}
        <div className="dashboard-placeholder">
          <img src={noStatsDashboard} alt="" />
          <span className="dashboard-placeholder-title">There&apos;s nothing here yet</span>
          <span className="dashboard-placeholder-description">
            You&apos;ll find your overall statistics here after you&apos;ll add your audience and
            run at least one campaign
          </span>
        </div>
        {/*)}*/}
      </div>
    </div>
  );
};

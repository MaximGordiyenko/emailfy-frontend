import { useNavigate } from 'react-router-dom';

import { useQuery } from 'react-query';
import { removeToken } from '../../../api/API';
import { getDashboardData } from '../../../api/dashboard/dashboard';

import BrandHeader from '../../../components/header/BrandHeader';
import DashboardDropdown from '../../../components/drop-down/DashboardDropdown';
import { LoadingSpinner } from '../../../components/loader/LoadingSpinner';

import { OverallStatistics } from './overall/OverallStatistics';

import dashboard from '../../../assets/images/dashboard/db-outline-dark-icon.png';
import noStatsDashboard from '../../../assets/images/dashboard/Frame 980740.svg';

import './style.scss';

export const DashboardPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery('dashboardData', getDashboardData, {
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
  console.log(data);

  const handleSelect = (selectedOption) => {
    // dispatch(setSelectedOption(selectedOption)); // dispatch action to update Redux state
  };

  const options = ['Year', 'Month', 'Week', 'Day'];

  const onClickButton = () => {
    navigate('/campaigns');
  };

  const renderedDropdownPlaceholder = (
    <div className="placeholder">
      <span>period</span> <div>{options[1]}</div>
    </div>
  );

  const renderHeaderContent = () => {
    return (
      <DashboardDropdown
        options={options}
        onSelect={handleSelect}
        placeholder={renderedDropdownPlaceholder}
      />
    );
  };

  return (
    <div className="dashboard-wrapper">
      <BrandHeader icon={dashboard} description={'Dashboard'} content={renderHeaderContent()} />
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

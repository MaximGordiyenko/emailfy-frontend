import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import BrandHeader from '../../../components/header/BrandHeader';
import dashboard from '../../../assets/images/dashboardicon.png';
import { OverallStatistics } from './overall/OverallStatistics';
import DashboardDropdown from '../../../components/dashboardDropdown/DashboardDropdown';
import { setSelectedOption } from '../../../store/userSlice';
import noStatsDashboard from '../../../assets/images/Dashboard/Frame 980740.svg';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleSelect = (selectedOption) => {
    dispatch(setSelectedOption(selectedOption)); // dispatch action to update Redux state
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
        {data.length ? (
          <OverallStatistics />
        ) : (
          <div className="dashboard-placeholder">
            <img src={noStatsDashboard} alt="" />
            <span className="dashboard-placeholder-title">There&apos;s nothing here yet</span>
            <span className="dashboard-placeholder-description">
              You&apos;ll find your overall statistics here after you&apos;ll add your audience and
              run at least one campaign
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

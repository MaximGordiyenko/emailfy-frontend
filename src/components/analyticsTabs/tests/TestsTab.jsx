import './style.scss';
import noStatsCampaigns from '../../../assets/images/dashboard/Frame 981287.svg';
import { useNavigate } from 'react-router-dom';

export const TestsTab = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate('/campaigns');
  };

  return (
    <div className="tests-tab-wrapper">
      <div className="tests-tab-placeholder">
        <img src={noStatsCampaigns} alt="" />
        <span className="tests-tab-title">There&apos;s nothing here yet</span>
        <span className="tests-tab-description">
          You&apos;ll find all your campaigns statistics here, and for now you can create your first
          campaign by clicking the button below
        </span>
        <button className="tests-tab-button" onClick={onClickButton}>
          Create campaign
        </button>
      </div>
    </div>
  );
};

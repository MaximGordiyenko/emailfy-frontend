import './style.scss';
import noStatsCampaigns from '../../../assets/images/Dashboard/Frame 981287.svg';
import { useNavigate } from 'react-router-dom';

export const CampaignsTab = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate('/campaigns');
  };

  return (
    <div className="campaigns-tab-wrapper">
      <div className="campaigns-tab-placeholder">
        <img src={noStatsCampaigns} alt="" />
        <span className="campaigns-tab-title">There&apos;s nothing here yet</span>
        <span className="campaigns-tab-description">
          You&apos;ll find all your campaigns statistics here, and for now you can create your first
          campaign by clicking the button below
        </span>
        <button className="campaigns-tab-button" onClick={onClickButton}>
          Create campaign
        </button>
      </div>
    </div>
  );
};

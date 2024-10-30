import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFields } from '../../store/campaignSlice';
import './styles.scss';

const BrandHeader = ({ icon, description, params, content }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDescriptionClick = () => {
    navigate('/' + description.toLowerCase());
    dispatch(
      clearFields([
        'campaign_name',
        'subject',
        'from_name',
        'from_email',
        'sendTo',
        'html',
        'campaign_text',
      ]),
    );
  };

  return (
    <div className={'brand-header campaign-header'}>
      <div className="content-box">
        <div className="route-status">
          <img src={icon} alt="header" />
          <div className="manual-routes">
            <span onClick={handleDescriptionClick}>
              {description} {params ? '/' : ''}
            </span>
            <span className="actual-path">{params}</span>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default BrandHeader;

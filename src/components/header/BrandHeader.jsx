import { useNavigate } from 'react-router-dom';
import './styles.css';

const BrandHeader = ({ icon, description, params, content }) => {
  const navigate = useNavigate();

  const handleDescriptionClick = () => {
    navigate('/' + description.toLowerCase());
  };

  return (
    <header className={'brand-header campaign-header'}>
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
    </header>
  );
};

export default BrandHeader;

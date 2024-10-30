import { MODAL_CARDS } from '../../../../constants/campaignsConstants';
import closeButton from '../../../../assets/images/close-button.svg';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const CampaignModal = ({ closeModal }) => {
  const navigate = useNavigate();

  return (
    <div className={'cam-modal-wrapper'}>
      <div className={'cam-modal'}>
        <div className={'cam-title'}>
          <span className={'modal-title'}>Create Email Campaign</span>
          <span className={'modal-title-text'}>Choose how you want to create the Email</span>
          <div className={'close-btn'} onClick={closeModal}>
            <img src={closeButton} alt={'close-modal'} className={'close-btn-icon'} />
          </div>
        </div>
        <div className={'cam-modal-cards'}>
          {MODAL_CARDS.map((card, i) => {
            return (
              <div
                onClick={() => {
                  localStorage.removeItem('current_template_id');
                  card.path && navigate(card.path);
                }}
                className="modal-card"
                key={i}
                style={{ background: card.background }}
                data-hover={card.hover}>
                <img src={card.img} alt="" className="modal-main-img" />
                {card.img2 && (
                  <div className="modal-card-upgrade">
                    <img src={card.img2} alt="" className="modal-card-upgrade-icon" />
                    <span className="modal-card-upgrade-text">UPGRADE</span>
                  </div>
                )}
                <span className="modal-card-title">{card.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

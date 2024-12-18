import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { DesktopIcon } from '../../../components/icons/DesktopIcon';
import { MobileIcon } from '../../../components/icons/MobileIcon';
import { TextIconButton } from '../../../components/icons/TextIconButton';
import { PenEditIcon } from '../../../components/icons/PenEditIcon';
import { EnvelopRoundIcon } from '../../../components/icons/EnvelopRoundIcon';
import { PreviewComponent } from './PreviewComponent';
import { SendMailModal } from '../../../components/modals/SendMailModal';
import './style.css';

export const CampaignsHtmlPreview = () => {
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
  const [mediaQuery, setMediaQuery] = useState('33%');

  const navigate = useNavigate();

  // const { html } = useSelector((state) => state.campaign.data);
  const html = 'blabla';

  const isDesktopMode = mediaQuery === '70%' ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === '33%' ? ' is-mobile' : '';

  return (
    <div className="campaign-preview">
      <div className="header-icon-btn-container">
        <div className="media-query-btn-wrapper">
          <DesktopIcon className={`${isDesktopMode}`} onClick={() => setMediaQuery('70%')} />
          <MobileIcon className={`${isMobileMode}`} onClick={() => setMediaQuery('33%')} />
        </div>
        <div className="preview-btn-wrapper">
          <TextIconButton
            className="btn-preview-wrapper"
            text="Back"
            onClick={() => navigate('/campaigns/create/html')}
            icon={<PenEditIcon />}
          />
          <TextIconButton
            text="Send test email"
            className="btn-preview-wrapper campaign-modal"
            icon={<EnvelopRoundIcon />}
            onClick={() => setIsOpenModalPreview(true)}
          />
        </div>
      </div>
      <PreviewComponent renderedData={html} desktopMode={isDesktopMode} mobileMode={isMobileMode} />
      <SendMailModal
        isOpenModal={isOpenModalPreview}
        onClose={() => setIsOpenModalPreview(false)}
      />
    </div>
  );
};

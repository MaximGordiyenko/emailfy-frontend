import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import { TextIconButton } from '../../../components/icons/TextIconButton';
import { EnvelopSendIcon } from '../../../components/icons/EnvelopSendIcon';
import { DesktopIcon } from '../../../components/icons/DesktopIcon';
import { MobileIcon } from '../../../components/icons/MobileIcon';
import { PenEditIcon } from '../../../components/icons/PenEditIcon';
import { PreviewComponent } from './PreviewComponent';
import { SendMailModal } from '../../../components/modals/SendMailModal';
import './style.css';
import { ROUTE } from '../../../routes/routes.constants';

export const CampaignsTextPreview = () => {
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
  const [mediaQuery, setMediaQuery] = useState('33%');

  const navigate = useNavigate();

  const { campaign_text } = useSelector((state) => state.campaign.data);
  const editorStateOfHtml = draftToHtml(campaign_text);

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
            onClick={() => navigate(`/${ROUTE.campaigns}/${ROUTE.createText}`)}
            icon={<PenEditIcon />}
          />
          <TextIconButton
            text="Send test email"
            className="btn-preview-wrapper campaign-modal"
            icon={<EnvelopSendIcon />}
            onClick={() => setIsOpenModalPreview(true)}
          />
        </div>
      </div>
      <PreviewComponent
        renderedData={editorStateOfHtml}
        desktopMode={isDesktopMode}
        mobileMode={isMobileMode}
      />
      <SendMailModal
        isOpenModal={isOpenModalPreview}
        onClose={() => setIsOpenModalPreview(false)}
      />
    </div>
  );
};

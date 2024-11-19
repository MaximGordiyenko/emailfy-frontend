import { useContext, useState } from 'react';
import { MailBuilderContext } from '../../../context/MailBuilderContext';
import { renderToStaticMarkup } from 'react-dom/server';
import { RootHtml, MailEditorToHTML } from '../../../helpers/TypeResolverComponent';
import { DesktopIcon } from '../../../components/interface/buttons/DesktopIcon';
import { MobileIcon } from '../../../components/interface/buttons/MobileIcon';
import { TextIconButton } from '../../../components/interface/buttons/TextIconButton';
import { PenEditIcon } from '../../../components/interface/buttons/PenEditIcon';
import { EnvelopSendIcon } from '../../../components/interface/buttons/EnvelopSendIcon';
import { PreviewComponent } from '../../campaigns/email-capmaign/PreviewComponent';
import { useNavigate } from 'react-router-dom';
import { SendMailModal } from '../../../components/modals/SendMailModal';
import { ROUTE } from '../../../routes/routes.constants';

export const MailPreviewPage = () => {
  const [isOpenSendMailModal, setIsOpenSendMailModal] = useState(false);
  const [mediaQuery, setMediaQuery] = useState('33%');
  const { mailEditorState } = useContext(MailBuilderContext);

  const navigate = useNavigate();

  const htmlMarkup = renderToStaticMarkup(
    <RootHtml>{MailEditorToHTML({ mailEditorState })}</RootHtml>,
  );

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
            className="btn-preview-wrapper campaign-modal"
            text="Back"
            onClick={() => navigate(`/${ROUTE.mailBuilderPage}`)}
            icon={<PenEditIcon />}
          />
          <TextIconButton
            text="Send test email"
            className="btn-preview-wrapper campaign-modal"
            icon={<EnvelopSendIcon />}
            onClick={() => {
              setIsOpenSendMailModal(!isOpenSendMailModal);
            }}
          />
        </div>
      </div>
      <PreviewComponent
        renderedData={htmlMarkup}
        desktopMode={isDesktopMode}
        mobileMode={isMobileMode}
      />
      <SendMailModal
        mailEditorState={mailEditorState}
        isOpenModal={isOpenSendMailModal}
        onClose={() => setIsOpenSendMailModal(!isOpenSendMailModal)}
      />
    </div>
  );
};

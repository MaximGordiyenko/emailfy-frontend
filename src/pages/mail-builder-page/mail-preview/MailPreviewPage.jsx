import { useContext, useState } from 'react';
import { MailBuilderContext } from '../../../context/MailBuilderContext.jsx';
import { renderToStaticMarkup } from 'react-dom/server';
import { RootHtml, MailEditorToHTML } from '../../../helpers/TypeResolverComponent.jsx';
import { TextIconButton } from '../../../components/icons/TextIconButton.jsx';
import { PenEditIcon } from '../../../components/icons/PenEditIcon.jsx';
import { EnvelopRoundIcon } from '../../../components/icons/EnvelopRoundIcon.jsx';
import { PreviewComponent } from '../../campaign-page/email-capmaign/PreviewComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { SendMailModal } from '../../../components/modals/SendMailModal.jsx';
import { ROUTE } from '../../../routes/routes.constants.js';
import { useMainContext } from '../../../context/MainContext.jsx';

export const MailPreviewPage = () => {
  const [isOpenSendMailModal, setIsOpenSendMailModal] = useState(false);
  // const [mediaQuery, setMediaQuery] = useState('33%');
  const { mailEditorState } = useContext(MailBuilderContext);
  const { mediaQuery } = useMainContext();

  const navigate = useNavigate();

  const htmlMarkup = renderToStaticMarkup(
    <RootHtml>{MailEditorToHTML({ mailEditorState })}</RootHtml>,
  );

  const isDesktopMode = mediaQuery === '70%' ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === '33%' ? ' is-mobile' : '';

  return (
    <div className="campaign-preview">
      <div className="header-icon-btn-container">
        <div className="media-query-btn-wrapper"></div>
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
            icon={<EnvelopRoundIcon />}
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

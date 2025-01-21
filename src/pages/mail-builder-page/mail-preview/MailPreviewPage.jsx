import { useContext, useState } from 'react';
import { MailBuilderContext } from '../../../context/MailBuilderContext.jsx';
import { renderToStaticMarkup } from 'react-dom/server';
import { RootHtml, MailEditorToHTML } from '../../../helpers/TypeResolverComponent.jsx';
import { PreviewComponent } from '../../campaign-page/email-capmaign/PreviewComponent.jsx';
import { SendMailModal } from '../../../components/modals/SendMailModal.jsx';
import { useMainContext } from '../../../context/MainContext.jsx';

export const MailPreviewPage = () => {
  const { mailEditorState } = useContext(MailBuilderContext);
  const { isOpenSendMailModal, setIsOpenSendMailModal, mediaQuery } = useMainContext();
  
  const htmlMarkup = renderToStaticMarkup(
    <RootHtml>{MailEditorToHTML({ mailEditorState })}</RootHtml>,
  );

  const isDesktopMode = mediaQuery === 70 ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === 33 ? ' is-mobile' : '';

  return (
    <div className="campaign-preview">
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

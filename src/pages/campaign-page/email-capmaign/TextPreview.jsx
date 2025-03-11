import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import draftToHtml from 'draftjs-to-html';
import { PreviewComponent } from './PreviewComponent.jsx';
import { SendMailModal } from '../../../components/modals/SendMailModal.jsx';
import { useMainContext } from '../../../context/MainContext.jsx';
import './style.css';

export const TextPreview = () => {
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
  
  const { mediaQuery} = useMainContext();
  const { watch } = useFormContext();
  
  const campaign_text = watch('text');
  
  const editorStateOfHtml = draftToHtml(campaign_text);

  const isDesktopMode = mediaQuery === 70 ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === 33 ? ' is-mobile' : '';

  return (
    <div className="campaign-preview">
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

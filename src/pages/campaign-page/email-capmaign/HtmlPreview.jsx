import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { DesktopIcon } from '../../../components/icons/DesktopIcon';
import { MobileIcon } from '../../../components/icons/MobileIcon';
import { TextIconButton } from '../../../components/icons/TextIconButton';
import { PenEditIcon } from '../../../components/icons/PenEditIcon';
import { EnvelopRoundIcon } from '../../../components/icons/EnvelopRoundIcon';
import { PreviewComponent } from './PreviewComponent';
import { SendMailModal } from '../../../components/modals/SendMailModal';
import { useMainContext } from '../../../context/MainContext.jsx';
import './style.css';

export const HtmlPreview = () => {
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
  const { mediaQuery } = useMainContext();
  
  const { watch } = useFormContext();
  
  // const { html } = useSelector((state) => state.campaign.data);
  
  const isDesktopMode = mediaQuery === 70 ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === 33 ? ' is-mobile' : '';
  
  return (
    <div className="campaign-preview">
      <PreviewComponent renderedData={watch('html')} desktopMode={isDesktopMode} mobileMode={isMobileMode}/>
      <SendMailModal
        isOpenModal={isOpenModalPreview}
        onClose={() => setIsOpenModalPreview(false)}
      />
    </div>
  );
};

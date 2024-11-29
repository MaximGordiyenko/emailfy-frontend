import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { TextIconWrapper } from '../wrappers/TextIconWrapper';
import { RoundCloseIcon } from '../icons/RoundCloseIcon';
import { InputText } from '../inputs/InputText';
import { BrandButton } from '../icons/BrandButton';
import { sendTestEmail } from '../../pages/mail-builder-page/builder-script/testEmail';
import { initAnalytics } from '../../pages/mail-builder-page/builder-script/analyticsUtil';
import { saveContent } from '../../pages/mail-builder-page/builder-script/builderTemplate';
import { useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';

export const CampaignModal = ({ isOpenModal, onClose }) => {
  const { subject, campaign_text, html } = useSelector((state) => state.campaign.data);
  const editorStateOfHtml = draftToHtml(html);
  console.log(editorStateOfHtml);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm();

  const { mutate } = useMutation(
    (data) => sendTestEmail(data?.email.split(',').map((email) => email.trim())),
    {
      onSuccess: (data) => {},
      onError: (error) => {},
    },
  );

  const onSubmitHandler = (value) => {
    // const htmlAnalytics = await initAnalytics(editorStateOfHtml);
    // await saveContent({
    //   content: htmlAnalytics,
    //   subject,
    // });
    mutate(value);
    onClose();
  };

  if (!isOpenModal) return null;
  return createPortal(
    <div className="modal-wrapper">
      <div className="modal-overlay" onClick={onClose} />
      <div className={`modal-container mail-container`}>
        <TextIconWrapper className="modal-header">
          <h3>Send email</h3>
          <RoundCloseIcon onClick={onClose} />
        </TextIconWrapper>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="modal-content mail-content">
          <div className="modal-input">
            <InputText name="email" control={control} />
          </div>
          <div className="modal-footer">
            <BrandButton
              className="modal-button"
              text="Cancel"
              variant="passive"
              onClick={onClose}
            />
            <BrandButton className="modal-button" text="Send" variant="active" type="submit" />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal'),
  );
};

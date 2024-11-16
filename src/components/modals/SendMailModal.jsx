import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { TextIconWrapper } from '../wrappers/TextIconWrapper';
import { InputText } from '../inputs/InputText';
import { RoundCloseIcon } from '../interface/buttons/RoundCloseIcon';
import { BrandButton } from '../interface/buttons/BrandButton';
import * as builderTemplate from '../../pages/mail-builder-page/builder-script/builderTemplate';
import * as testEmail from '../../pages/mail-builder-page/builder-script/testEmail';
import './styles.css';

export const SendMailModal = ({ isOpenModal, onClose, mailEditorState }) => {
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      (await builderTemplate.saveContent({
        subject: 'Test email',
      })) || onClose();
      await builderTemplate.saveScript(mailEditorState);
    })();
  }, []);

  const { mutate } = useMutation(
    (data) => testEmail.sendTestEmail(data?.email.split(',').map((email) => email.trim())),
    {
      onSuccess: (data) => {},
      onError: (error) => {},
    },
  );

  const onSubmitHandler = (values) => {
    mutate(values);
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

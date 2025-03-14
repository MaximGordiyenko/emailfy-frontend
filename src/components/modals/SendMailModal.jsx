import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { TextIconWrapper } from '../wrappers/TextIconWrapper.jsx';
import { InputText } from '../inputs/InputText.jsx';
import { RoundCloseIcon } from '../icons/RoundCloseIcon.jsx';
import { BrandButton } from '../icons/BrandButton.jsx';
import * as builderTemplate from '../../pages/mail-builder-page/builder-script/builderTemplate.js';
import * as testEmail from '../../pages/mail-builder-page/builder-script/testEmail.js';
import './styles.css';
import { PenEditIcon } from '../icons/PenEditIcon.jsx';
import { AppButton } from '../button/AppButton.jsx';

export const SendMailModal = ({ isOpenModal, onClose, mailEditorState }) => {
  const { control, handleSubmit } = useForm();

  // useEffect(() => {
  //   (async () => {
  //     (await builderTemplate.saveContent({
  //       subject: 'Test email',
  //     })) || onClose();
  //     await builderTemplate.saveScript(mailEditorState);
  //   })();
  // }, []);

  // const { mutate } = useMutation(
  //   (data) => testEmail.sendTestEmail(data?.email.split(',').map((email) => email.trim())),
  //   {
  //     onSuccess: (data) => {},
  //     onError: (error) => {},
  //   },
  // );

  const onSubmitHandler = (values) => {
    // mutate(values);
    onClose();
  };

  if (!isOpenModal) return null;
  return createPortal(
    <div className="modal-wrapper">
      <div className="modal-overlay" onClick={onClose} />
      <div className={`modal-container mail-container`}>
        <div className="modal-header">
          <h3>Send email</h3>
          <RoundCloseIcon onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="modal-content mail-content">
          <div className="modal-input">
            <InputText name="email" control={control} />
          </div>
          <div className="modal-footer">
            <AppButton
              label={'Cancel'}
              kind={'outlined'}
              variant="default"
              onClick={onClose}
            />
            <AppButton
              label={'Send'}
              role="submit"
            />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal'),
  );
};

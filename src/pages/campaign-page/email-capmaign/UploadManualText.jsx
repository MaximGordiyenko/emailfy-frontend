import { useEffect } from 'react';
import { useMainContext } from '../../../context/MainContext';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { campaignTextSchema } from '../../../validation/textCampaign';

import { InputText } from '../../../components/inputs/InputText';
import './style.css';
import { LoadBalancing } from '../../../components/balancing/LoadBalancing';
import { UploadCampaignForm } from './UploadCampaignForm';
import { PenEditIcon } from '../../../components/icons/PenEditIcon';
import { UploadTextForm } from './UploadTextForm';

export const UploadManualText = () => {
  const { emailCampaignStep, setEmailCampaignStep } = useMainContext();

  // const { campaign_name, subject, campaign_text, from_email } = useSelector(
  //   (state) => state.campaign.data,
  // );

  // setEditorType('text');

  const campaign_name = 'cool campaign';

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(campaignTextSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onInputChange = (field, value) => {};
  // const onInputChange = (field, value) => dispatch(updateField({ field, value }));

  useEffect(() => {
    // getUserEmail(setValue).then((r) => r);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await saveContent({
  //       subject: subject,
  //       sender_name: from_email,
  //       content: campaign_text,
  //     });
  //   })().then();
  // }, [subject, from_email, campaign_text]);

  useEffect(() => {
    // (async () => {
    //   const { subject, sender_name, content } = await loadContent();
    //   dispatch(updateField({ field: 'subject', value: subject }));
    //   dispatch(updateField({ field: 'from_email', value: sender_name }));
    //   dispatch(updateField({ field: 'campaign_text', value: content }));
    // })().then();
  }, []);

  const onSuccess = () => {
    setEmailCampaignStep(1);
  };

  const onSubmitHandler = (values) => {
    // mutate(values);
    onSuccess();
    // onClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="create-campaign-form">
        {emailCampaignStep ? (
          <LoadBalancing />
        ) : (
          <>
            <div className="campaign-input-box">
              <InputText
                value={/*campaign_name*/ ''}
                onInputChange={(value) => onInputChange('campaign_name', value)}
                control={control}
                name="campaign_name"
                placeholder="Campaign name"
                className="campaign-input_name"
                style={{ outline: 'none', padding: 0 }}
              />
              {!campaign_name && <img src={'#'} alt="tooltip" className="campaign_tooltip" />}
              {!campaign_name || <PenEditIcon className="campaign-edit-icon" />}
            </div>
            <div className="campaign-upload-content">
              <UploadCampaignForm onInputChange={onInputChange} />
              <UploadTextForm
                control={control}
                name="campaign_text"
                placeholder="Enter email text"
              />
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

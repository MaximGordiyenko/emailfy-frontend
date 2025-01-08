import { useEffect } from 'react';
import { useMainContext } from '../../../context/MainContext.jsx';

import { useMutation } from '@tanstack/react-query';
import { getToken, removeToken } from '../../../api/API';
import { create_template } from '../../../api/builder/templates.js';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { campaignHtmlSchema } from '../../../validation/htmlCampaign.js';

import * as builderTemplate from '../../mail-builder-page/builder-script/builderTemplate.js';
import * as userInfoAPI from '../../../api/settings/account.js';
import { getUserEmail } from '../../../helpers/campaignsUtils.js';

import { InputText } from '../../../components/inputs/InputText.jsx';
import './style.css';
import { LoadBalancing } from '../../../components/balancing/LoadBalancing.js';
import { CampaignStepper } from './CampaignStepper.jsx';
import bla from '../../../assets/images/alert_circle.png';
import { PenEditIcon } from '../../../components/icons/PenEditIcon.jsx';
import { UploadCampaignForm } from './UploadCampaignForm.jsx';
import { UploadHtmlForm } from './UploadHTMLForm.jsx';

export const UploadHTML = () => {
  const { emailCampaignStep, setEmailCampaignStep } = useMainContext();

  builderTemplate?.setEditorType('html');

  // const { campaign_name, subject, html, from_email } = useSelector((state) => state?.campaign?.data);
  const campaign_name = 'cool campaign';

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(campaignHtmlSchema),
  });

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    // getUserEmail(setValue).then((r) => r);
  }, []);

  useEffect(() => {
    // (async () => {
    //   const { subject, sender_name, content } = await loadContent();
    //   dispatch(updateField({ field: 'subject', value: subject }));
    //   dispatch(updateField({ field: 'from_email', value: sender_name }));
    //   dispatch(updateField({ field: 'html', value: content }));
    // })().then();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await saveContent({
  //       subject: subject,
  //       sender_name: from_email,
  //       content: html,
  //     });
  //   })().then();
  // }, [subject, from_email, html]);

  const goBack = () => {
    setEmailCampaignStep(0);
  };

  const onSuccess = () => {
    setEmailCampaignStep(1);
  };

  const { mutate } = useMutation({
    mutationFn: (data) => create_template(data),
    onSuccess: ({ message }) => {},
    onError: (error) => {},
  });

  const onSubmitHandler = (values) => {
    mutate(values);
    onSuccess();
    // onClose();E
  };

  // const onInputChange = (field, value) => dispatch(updateField({ field, value }));
  const onInputChange = (field, value) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="create-campaign-form">
        {emailCampaignStep ? (
          <LoadBalancing />
        ) : (
          <>
            <CampaignStepper />
            <div className="campaign-input-box">
              <InputText
                value={/*campaign_name */ ''}
                onInputChange={(value) => onInputChange('campaign_name', value)}
                control={control}
                name="campaign_name"
                placeholder="Campaign name"
                className="campaign-input_name"
                style={{ outline: 'none', padding: 0 }}
              />
              {!campaign_name && <img src={bla} alt="tooltip" className="campaign_tooltip" />}
              {!campaign_name || <PenEditIcon className="campaign-icon_edit" />}
            </div>

            <div className="campaign-upload-content">
              <UploadCampaignForm onInputChange={onInputChange} />
              <UploadHtmlForm />
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

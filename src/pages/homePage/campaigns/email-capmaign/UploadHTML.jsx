import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { campaignHtmlSchema } from '../../../../validation/htmlCampaign';
import BrandHeader from '../../../../components/header/BrandHeader';
import airPlaneIcon from '../../../../assets/images/plane.png';
import campaign_name_tooltip from '../../../../assets/images/campaign_name_tooltip.svg';
import { Button } from '../../../../components/button/Button';
import { UploadCampaignForm } from './UploadCampaignForm';
import { UploadHtmlForm } from './UploadHTMLForm';
import { create_template } from '../../../../api/builder/templates';
import { InputText } from '../../../../components/inputComponent/InputText';
import { PenEditIcon } from '../../../../components/inputComponent/PenEditIcon';
import { CampaignStepper } from './CampaignStepper';
import {
  saveContent,
  loadContent,
} from '../../../mail-builder-page/builder-script/builderTemplate';
import { initAnalytics } from '../../../mail-builder-page/builder-script/analyticsUtil';
import { LoadBalancing } from '../../../../components/loadBalancing/LoadBalancing';
import { updateField } from '../../../../store/campaignSlice';
import * as builderTemplate from '../../../mail-builder-page/builder-script/builderTemplate';
import './style.css';
import * as userInfoAPI from '../../../../api/settings/user_info';
import { getUserEmail } from '../../../../helpers/campaignsUtils';
import { getToken } from '../../../../api/API';

export const UploadHTML = () => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  builderTemplate.setEditorType('html');

  const { campaign_name, subject, html, from_email } = useSelector((state) => state.campaign.data);

  console.log({ campaign_name, subject, html });
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
    getUserEmail(setValue).then((r) => r);
  }, []);

  useEffect(() => {
    (async () => {
      const { subject, sender_name, content } = await loadContent();
      dispatch(updateField({ field: 'subject', value: subject }));
      dispatch(updateField({ field: 'from_email', value: sender_name }));
      dispatch(updateField({ field: 'html', value: content }));
    })().then();
  }, []);

  useEffect(() => {
    (async () => {
      await saveContent({
        subject: subject,
        sender_name: from_email,
        content: html,
      });
    })().then();
  }, [subject, from_email, html]);

  const goBack = () => {
    setStep(0);
  };

  const onSuccess = () => {
    setStep(1);
  };

  const { mutate } = useMutation(async (data) => create_template(getToken('accessToken'), ''), {
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const onSubmitHandler = (values) => {
    mutate(values);
    onSuccess();
    // onClose();
  };

  const onInputChange = (field, value) => dispatch(updateField({ field, value }));

  const headerButtons = () => (
    <div className={'header-buttons'}>
      {step ? (
        <div className={'border-btn'} onClick={goBack}>
          <span className={'btn-text'}>Back</span>
        </div>
      ) : (
        <Button
          btnText={'Save draft'}
          type="submit"
          onClick={async () => {
            await saveContent({
              subject: subject,
              sender_name: getValues()?.from_email,
            });
          }}
        />
      )}
      <Button isFilled={!step} btnText={step ? 'Save draft' : 'Continue'} type="submit" />
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="create-campaign-form">
        <BrandHeader
          icon={airPlaneIcon}
          description="Campaigns"
          params="Create new campaign"
          content={headerButtons()}
        />
        {step ? (
          <LoadBalancing />
        ) : (
          <>
            <CampaignStepper />
            <div className="campaign-input-box">
              <InputText
                value={campaign_name}
                onInputChange={(value) => onInputChange('campaign_name', value)}
                control={control}
                name="campaign_name"
                placeholder="Campaign name"
                className="campaign-input_name"
                style={{ outline: 'none', padding: 0 }}
              />
              {!campaign_name && (
                <img src={campaign_name_tooltip} alt="tooltip" className="campaign_tooltip" />
              )}
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

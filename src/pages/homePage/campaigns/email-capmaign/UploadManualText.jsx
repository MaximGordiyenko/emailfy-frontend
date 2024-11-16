import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { campaignTextSchema } from '../../../../validation/textCampaign';
import BrandHeader from '../../../../components/header/BrandHeader';
import plane from '../../../../assets/images/plane.png';
import campaign_name_tooltip from '../../../../assets/images/campaign_name_tooltip.svg';
import { Button } from '../../../../components/button/Button';
import { InputText } from '../../../../components/inputs/InputText';
import { PenEditIcon } from '../../../../components/inputs/PenEditIcon';
import { UploadCampaignForm } from './UploadCampaignForm';
import { CampaignStepper } from './CampaignStepper';
import { UploadTextForm } from './UploadTextForm';
import {
  saveContent,
  setEditorType,
  loadContent,
} from '../../../mail-builder-page/builder-script/builderTemplate';
import { updateField } from '../../../../store/campaignSlice';
import { LoadBalancing } from '../../../../components/balancing/LoadBalancing';
import { getUserEmail } from '../../../../helpers/campaignsUtils';
import './style.css';

export const UploadManualText = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);

  const { campaign_name, subject, campaign_text, from_email } = useSelector(
    (state) => state.campaign.data,
  );

  setEditorType('text');

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

  const onInputChange = (field, value) => dispatch(updateField({ field, value }));

  useEffect(() => {
    getUserEmail(setValue).then((r) => r);
  }, []);

  useEffect(() => {
    (async () => {
      await saveContent({
        subject: subject,
        sender_name: from_email,
        content: campaign_text,
      });
    })().then();
  }, [subject, from_email, campaign_text]);

  useEffect(() => {
    (async () => {
      const { subject, sender_name, content } = await loadContent();
      dispatch(updateField({ field: 'subject', value: subject }));
      dispatch(updateField({ field: 'from_email', value: sender_name }));
      dispatch(updateField({ field: 'campaign_text', value: content }));
    })().then();
  }, []);

  const goBack = () => {
    setStep(0);
  };

  const onSuccess = () => {
    setStep(1);
  };

  const onSubmitHandler = (values) => {
    // mutate(values);
    onSuccess();
    // onClose();
  };

  const headerButtons = () => (
    <div className={'header-buttons'}>
      {step ? (
        <div className={'border-btn'} onClick={goBack}>
          <span className={'btn-text'}>Back</span>
        </div>
      ) : (
        <Button btnText={'Save draft'} type="submit" />
      )}
      <Button
        isFilled={!step}
        btnText={step ? 'Save draft' : 'Continue'}
        type="submit"
        disabled={!isValid}
        onClick={async () => {
          await saveContent({
            subject: subject,
            content: campaign_text,
          });
        }}
      />
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="create-campaign-form">
        <BrandHeader
          icon={plane}
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

import { useEffect } from 'react';
import { useMainContext } from '../../../context/MainContext';

import { useFormContext } from 'react-hook-form';

import { LoadBalancing } from '../../../components/balancing/LoadBalancing';
import { UploadCampaignForm } from './UploadCampaignForm';
import { PenEditIcon } from '../../../components/icons/PenEditIcon.jsx';
import { AuthInput } from '../../../components/forms/AuthInput.tsx';

import { tooltipMessages } from '../campaign.constants.js';

import { Divider, Tooltip, Space, Flex, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './style.css';
import { TextEditor } from '../../../components/editors/TextEditor.jsx';

const { Title } = Typography;

export const UploadManualText = () => {
  const { emailCampaignStep, setEmailCampaignStep } = useMainContext();
  
  // const { campaign_name, subject, campaign_text, from_email } = useSelector(
  //   (state) => state.campaign.data,
  // );
  
  // setEditorType('text');
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = useFormContext();
  
  const isCampaignName = !!watch('campaign');
  
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
    <form onSubmit={handleSubmit(onSubmitHandler)} className="create-campaign-form">
      {emailCampaignStep ? (
        <LoadBalancing/>
      ) : (
        <>
          <Divider orientation="left">
            <Tooltip title={tooltipMessages.firstCampaignSteps} placement="topLeft">
              <Title level={3} type="secondary">
                Email Campaign Creation
              </Title>
            </Tooltip>
          </Divider>
          
          <Space size={'large'}>
            <AuthInput
              name={'campaign'}
              placeholder={'Enter your campaign name'}
              type={'text'}
              size="large"
              control={control}
              allowClear={true}
              prefix={isCampaignName || <EditOutlined/>}
              validateStatus={errors.campaign ? 'error' : ''}
              help={errors.campaign?.message}
            />
          </Space>
          
          <Flex gap={64}>
            <UploadCampaignForm/>
            <Flex vertical flex={'1 1 50%'}>
              <TextEditor
                label="Upload Text Manually"
                required={true}
                name="text"
                control={control}
                placeholder={'Input your text'}
                validateStatus={errors.text ? 'error' : ''}
                help={errors.text?.message}/>
            </Flex>
          </Flex>
        </>
      )}
    </form>
  );
};

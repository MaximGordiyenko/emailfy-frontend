import { useEffect } from 'react';
import { useMainContext } from '../../../context/MainContext.jsx';

import { useMutation } from '@tanstack/react-query';
import { getToken, removeToken } from '../../../api/API';
import { create_template } from '../../../api/builder/templates.js';

import { useFormContext } from 'react-hook-form';

import * as builderTemplate from '../../mail-builder-page/builder-script/builderTemplate.js';
import * as userInfoAPI from '../../../api/settings/account.js';
import { getUserEmail } from '../../../helpers/campaignsUtils.js';

import { LoadBalancing } from '../../../components/balancing/LoadBalancing.js';
import { UploadCampaignForm } from './UploadCampaignForm.jsx';
import { AuthInput } from '../../../components/forms/AuthInput.tsx';
import DefaultUploaderViewer from '../../../components/drag-n-drop-uploader/DefaultUploaderViewer.jsx';

import { Flex, Space, Tooltip, Divider, Typography } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, InboxOutlined, DeleteOutlined } from '@ant-design/icons';

import { tooltipMessages } from '../campaign.constants.js';
import './style.css';

const { Title } = Typography;

export const UploadHTML = () => {
  const { emailCampaignStep, setEmailCampaignStep } = useMainContext();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = useFormContext();
  
  const isCampaignName = !!watch('campaign');
  
  console.log(isValid, isDirty);
  
  builderTemplate?.setEditorType('html');
  
  // const { campaign_name, subject, html, from_email } = useSelector((state) => state?.campaign?.data);
  
  // const methods = useForm({
  //   mode: 'onChange',
  //   resolver: yupResolver(campaignHtmlSchema),
  //   defaultValues: {
  //     campaign: '',
  //     subject: '',
  //     fromName: '',
  //     fromEmail: '',
  //     sendTo: [],
  //     html: ''
  //   }
  // });
  //
  // const {
  //   control,
  //   watch,
  //   handleSubmit,
  //   formState: { errors, isValid }
  // } = methods;
  
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
    onSuccess: ({ message }) => {
    },
    onError: (error) => {
    }
  });
  
  const onSubmitHandler = (values) => {
    mutate(values);
    onSuccess();
    // onClose();
  };
  
  return (
    <>
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
                <DefaultUploaderViewer
                  label="Upload HTML Email"
                  required={true}
                  name="html"
                  control={control}
                  validateStatus={errors.html ? 'error' : ''}
                  help={errors.html?.message}
                />
              </Flex>
            </Flex>
          </>
        )}
      </form>
    </>
  );
};

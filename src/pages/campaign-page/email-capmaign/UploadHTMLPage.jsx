import { Outlet } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { campaignHtmlSchema } from '../../../validation/htmlCampaign.js';

export const UploadHtmlPage = () => {
  
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(campaignHtmlSchema),
    defaultValues: {
      campaign: '',
      subject: '',
      fromName: '',
      fromEmail: '',
      sendTo: [],
      html: ''
    }
  });
  
  return (
    <FormProvider {...methods}>
      <Outlet/>
    </FormProvider>
  );
};

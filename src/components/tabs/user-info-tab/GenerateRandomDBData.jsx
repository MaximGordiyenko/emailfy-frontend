import { Space, Divider, Button, Flex } from 'antd';
import { useMutation } from '@tanstack/react-query';
import {
  generateClientEmails,
  generateEmailCampaigns,
  generateEmailsStatistic
} from '../../../api/settings/settings.js';

export const GenerateRandomDbData = () => {
  const { mutate: clientEmails, isPending: isPendingClientEmails } = useMutation({
    mutationFn: () => generateClientEmails(),
    onSuccess: ({ message }) => {
    },
    onError: (error) => {
    }
  });
  
  const { mutate: emailCampaigns, isPending: isPendingEmailCampaigns } = useMutation({
    mutationFn: () => generateEmailCampaigns(),
    onSuccess: ({ message }) => {
    },
    onError: (error) => {
    }
  });
  
  const { mutate: emailsStatistic, isPending: isPendingEmailsStatistic } = useMutation({
    mutationFn: () => generateEmailsStatistic(),
    onSuccess: ({ message }) => {
    },
    onError: (error) => {
    }
  });
  
  return (
    <Space direction="vertical" size="small">
      <Divider/>
      <Flex gap={20}>
        <Button
          onClick={() => clientEmails()}
          disabled={isPendingClientEmails}>
          {isPendingClientEmails ? "Generating..." : "Generate Client Emails"}
        </Button>
        
        <Button
          onClick={() => emailCampaigns()}
          disabled={isPendingEmailCampaigns}>
          {isPendingEmailCampaigns ? "Generating..." : "Generate Email Campaigns"}
        </Button>
        
        <Button
          onClick={() => emailsStatistic()}
          disabled={isPendingEmailsStatistic}>
          {isPendingEmailsStatistic ? "Generating..." : "Generate Email Statistic"}
        </Button>
      </Flex>
    </Space>
  );
};

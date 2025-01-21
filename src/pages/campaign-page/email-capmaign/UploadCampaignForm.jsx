import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import * as groupApi from '../../../api/subscribes/groups.js';
import { GroupInputs } from '../../../components/inputs/GroupInputs.jsx';
import { get_smtp } from '../../../api/settings/settings.js';
import './style.css';
import { getToken } from '../../../api/API.js';
import { ROUTE } from '../../../routes/routes.constants.js';
import { EditOutlined } from '@ant-design/icons';
import { Typography, Tabs, Space, Flex, Form, Input } from 'antd';
import { AuthInput } from '../../../components/forms/AuthInput.tsx';
import { MultiSelect } from '../../../components/selects/MultiSelect.jsx';

const { Item } = Form;
const { Group } = Input;

export const UploadCampaignForm = () => {
  const [audienceList, setAudienceList] = useState([]);
  
  const { pathname } = useLocation();
  
  // const { subject, from_name, from_email, sendTo } = useSelector((state) => state.campaign.data);
  const subject = 'subject of upload';
  const fromName = 'max@gmail.com';
  const fromEmail = 'max@gmail.com';
  const sendTo = 'max@gmail.com';
  
  const {
    control,
    formState: { errors }
  } = useFormContext();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = getToken('accessToken');
        const rootGroup = (await groupApi?.get_root(access_token))?.data;
        const groups = (await groupApi.get_subgroups(access_token, rootGroup.id)).data;
        const core_users_count = (await groupApi.get_subscribers_count(access_token, rootGroup.id))
          .data.count;
        
        const groupsList = [
          {
            id: uuidv4(),
            name: 'Core list',
            contacts: core_users_count,
            segments: groups.length,
            created: format(new Date(rootGroup?.created_at), 'MMM d, yyyy'),
            modified: format(new Date(rootGroup?.updated_at), 'MMM d, yyyy')
          }
        ];
        
        const promises = groups?.map(async (group) => {
          const subscribers_count = (await groupApi.get_subscribers_count(access_token, group.id))
            .data.count;
          const subgroups = (await groupApi.get_subgroups(access_token, group.id)).data;
          
          return {
            id: group.id,
            name: group.name,
            contacts: subscribers_count,
            segments: subgroups.length,
            created: format(new Date(group.created_at), 'MMM d, yyyy'),
            modified: format(new Date(group.updated_at), 'MMM d, yyyy')
          };
        });
        
        const updatedGroups = await Promise.all(promises);
        const updatedAudienceList = [...groupsList, ...updatedGroups];
        setAudienceList(updatedAudienceList);
      } catch (error) {
        console.error('Error fetching audience list:', error);
      }
    };
    
    fetchData().then((r) => r);
  }, []);
  
  const amountOfRecipients = sendTo
    ? audienceList?.find((recipient) => recipient.id === sendTo?.value)?.contacts
    : 0;
  
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      id: i.toString(36) + i,
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  
  return (
    <Flex vertical flex={'1 1 50%'}>
      <AuthInput
        name={'subject'}
        value={subject}
        placeholder={'Enter your mail subject'}
        type="text"
        label="Subject"
        size={'large'}
        control={control}
        allowClear={true}
        required={true}
        validateStatus={errors.subject ? 'error' : ''}
        help={errors.subject?.message}
      />
      
      <GroupInputs
        from_name={'fromName'}
        from_name_value={fromName}
        addonBeforeName={'Name'}
        placeholderName={'Enter name'}
        from_email={'fromEmail'}
        from_mail_value={fromEmail}
        addonBeforeEmail={'Email'}
        placeholderEmail={'Enter email'}
        label={'From'}
        defaultMail=""
        size={'large'}
        required={true}
        allowClear={true}
        control={control}
        validateStatus={errors.fromEmail ? 'error' : ''}
        help={errors.fromEmail?.message}
      />
      
      <MultiSelect
        name={'sendTo'}
        label={'Sent To'}
        allowClear={false}
        required={true}
        value={sendTo}
        size={'large'}
        control={control}
        options={options}
        validateStatus={errors.sendTo ? 'error' : ''}
        help={errors.sendTo?.message}
      />
      
      {/*<InputSelect*/}
      {/*  name="sendTo"*/}
      {/*  value={sendTo}*/}
      {/*  onInputChange={(selectedOption) => onInputChange('sendTo', selectedOption)}*/}
      {/*  control={control}*/}
      {/*  errors={errors}*/}
      {/*  options={audienceList}*/}
      {/*  label="To"*/}
      {/*  labelInfo={<span className="recipients-info">{amountOfRecipients} recipients</span>}*/}
      {/*  labelData={amountOfRecipients}*/}
      {/*  required={true}*/}
      {/*  placeholder="Select list"*/}
      {/*/>*/}
    </Flex>
  );
};

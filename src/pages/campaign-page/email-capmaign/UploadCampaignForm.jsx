import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { InputSelect } from '../../../components/inputs/InputSelect.jsx';
import { InputText } from '../../../components/inputs/InputText.jsx';
import * as groupApi from '../../../api/subscribes/groups.js';
import { GroupInputs } from '../../../components/inputs/GroupInputs.jsx';
import { get_smtp } from '../../../api/settings/settings.js';
import './style.css';
import { getToken } from '../../../api/API.js';
import { ROUTE } from '../../../routes/routes.constants.js';

export const UploadCampaignForm = ({ onInputChange }) => {
  const [audienceList, setAudienceList] = useState([]);

  const { pathname } = useLocation();

  // const { subject, from_name, from_email, sendTo } = useSelector((state) => state.campaign.data);
  const subject = 'subject of upload';
  const from_name = 'max@gmail.com';
  const sendTo = 'max@gmail.com';
  const from_email = 'max@gmail.com';

  const {
    control,
    formState: { errors },
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
            modified: format(new Date(rootGroup?.updated_at), 'MMM d, yyyy'),
          },
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
            modified: format(new Date(group.updated_at), 'MMM d, yyyy'),
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

  return (
    <div className="campaign-forms">
      <div className="campaign-forms_subject">
        <InputText
          value={subject}
          control={control}
          errors={errors}
          required={true}
          onInputChange={(value) => onInputChange('subject', value)}
          label="Subject"
          name="subject"
          placeholder="Mail subject"
          bg={
            pathname === `/${ROUTE.campaignsPage}/${ROUTE.createHtml}` ||
            pathname === `/${ROUTE.campaignsPage}/${ROUTE.createText}`
          }
        />
      </div>

      <div className="campaign-forms_group-from">
        <GroupInputs
          from_name_value={from_name}
          from_mail_value={from_email}
          control={control}
          errors={errors}
          from_name_onChange={(value) => onInputChange('from_name', value)}
          from_mail_onChange={(value) => onInputChange('from_email', value)}
          defaultMail=""
          required={true}
          label="From"
          from_name="from_name"
          from_email="from_email"
          placeholder1="Enter name"
          placeholder2="Enter email"
        />
      </div>

      <InputSelect
        name="sendTo"
        value={sendTo}
        onInputChange={(selectedOption) => onInputChange('sendTo', selectedOption)}
        control={control}
        errors={errors}
        options={audienceList}
        label="To"
        labelInfo={<span className="recipients-info">{amountOfRecipients} recipients</span>}
        labelData={amountOfRecipients}
        required={true}
        placeholder="Select list"
      />
    </div>
  );
};

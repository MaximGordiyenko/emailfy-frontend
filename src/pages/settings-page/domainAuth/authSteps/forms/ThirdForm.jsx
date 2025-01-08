import { useContext } from 'react';
import { NewSmtpContext } from '../StepProgress';
import { Divider, Card, List, Typography } from 'antd';
import { AuthInput } from '../../../../../components/forms/AuthInput.tsx';
const { Title, Text, Link } = Typography;

const data = [
  'After adding the new DNS record, select &quot;TXT&quot; as the type.',
  'For Type, choose TXT from the drop-down menu.',
  'For Value, copy/paste the Value info from TXT below.',
  'For Name, copy/paste the name into from TXT below.',
  'Leave TTL at the default settings',
  'Click the Save button.',
];

export const ThirdForm = ({ control, errors }) => {
  const { dkim } = useContext(NewSmtpContext);
  const { name, value } = dkim;

  return (
    <Card>
      <Text>
        On your domain provider, you are going to add TXT records. These record help emailfyo direct
        your email to the right place
      </Text>
      <Divider />

      <AuthInput
        name={'TXTValue'}
        label={'TXT value'}
        placeholder={'Enter your TXT value'}
        type={'text'}
        control={control}
        validateStatus={errors?.TXTValue ? 'error' : ''}
        help={errors?.TXTValue?.message}
      />
      <AuthInput
        name={'TXTName'}
        label={'TXT name'}
        placeholder={'Enter your TXT name'}
        type={'text'}
        control={control}
        validateStatus={errors?.TXTName ? 'error' : ''}
        help={errors?.TXTName?.message}
      />
      <List
        bordered={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Text type="secondary">&#x2022;</Text> {item}
          </List.Item>
        )}
      />
    </Card>
  );
};

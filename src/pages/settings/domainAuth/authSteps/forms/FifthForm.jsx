import { useContext } from 'react';
import { NewSmtpContext } from '../StepProgress';
import { Divider, List, Card, Typography } from 'antd';
import { AuthInput } from '../../../../../components/forms/AuthInput.tsx';
const { Title, Text, Link } = Typography;

const data = ['Select TXT as a type.', ' Leave "TTL" at the default settings.'];

export const FifthForm = ({ control, errors }) => {
  const { dmarc } = useContext(NewSmtpContext);
  const { name, value } = dmarc;

  return (
    <Card>
      <Text>
        The domain provider, you are going to add DMARC records. These record help emailfyo direct
        your email to the right place (this step is optional).
      </Text>
      <Divider />

      <AuthInput
        name={'DMARCalue'}
        label={'DMARC value'}
        placeholder={'Enter your TXT value'}
        type={'text'}
        control={control}
        validateStatus={errors?.DMARCValue ? 'error' : ''}
        help={errors?.DMARCalue?.message}
      />
      <AuthInput
        name={'DMARCName'}
        label={'DMARC name'}
        placeholder={'Enter your TXT name'}
        type={'text'}
        control={control}
        validateStatus={errors?.DMARCName ? 'error' : ''}
        help={errors?.DMARCName?.message}
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

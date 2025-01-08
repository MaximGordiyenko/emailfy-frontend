import { useContext } from 'react';
import { NewSmtpContext } from '../StepProgress';
import { Divider, List, Card, Typography } from 'antd';
import { AuthInput } from '../../../../../components/forms/AuthInput.tsx';
const { Title, Text, Link } = Typography;

const data = ['Select "TXT" as a type.', ' Leave "TTL" at the default settings.'];

export const FourthForm = ({ control, errors }) => {
  const { spf } = useContext(NewSmtpContext);
  const { name, value } = spf;

  return (
    <Card>
      <Text>
        The domain provider, you are going to add SPF records. These record help emailfyo direct
        your email to the right place
      </Text>
      <Divider />

      <AuthInput
        name={'SPFalue'}
        label={'SPF value'}
        placeholder={'Enter your TXT value'}
        type={'text'}
        control={control}
        validateStatus={errors?.SPFValue ? 'error' : ''}
        help={errors?.SPFValue?.message}
      />
      <AuthInput
        name={'SPFame'}
        label={'SPF name'}
        placeholder={'Enter your TXT name'}
        type={'text'}
        control={control}
        validateStatus={errors?.SPFName ? 'error' : ''}
        help={errors?.SPFName?.message}
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

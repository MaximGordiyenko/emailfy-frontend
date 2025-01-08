import { Space, Divider, Card, Typography } from 'antd';
import '../styles.css';
import { AuthInput } from '../../../../../components/forms/AuthInput.tsx';
const { Title, Text, Link } = Typography;

export const FirstForm = ({
  control,
  errors,
  // domainName,
  // email,
  // onChangeDomainName,
  // onChangeEmail,
  // isError,
  // onBlur,
}) => {
  return (
    <Card>
      <Text>
        Select your corporate domain, which will be used to send email campaigns from your email
        addresses.
      </Text>
      <Divider />

      <AuthInput
        name={'domain'}
        label={'Domain name'}
        placeholder={'Enter your domain'}
        type={'text'}
        control={control}
        validateStatus={errors?.domain ? 'error' : ''}
        help={errors?.domain?.message}
      />
      <AuthInput
        name={'email'}
        label={'Email name'}
        placeholder={'Enter your email'}
        type={'text'}
        control={control}
        validateStatus={errors?.email ? 'error' : ''}
        help={errors?.email?.message}
      />
      <span style={{ color: 'red' }}>ERROR: Domain and email domain must be the same</span>
      {/* <InputComponent
          placeholder="Enter your domain"
          label="Domain name"
          value={domainName}
          onChange={onChangeDomainName}
        />
        <InputComponent
          placeholder="Enter your email"
          type="email"
          label="Email"
          value={email}
          onChange={onChangeEmail}
        />*/}
    </Card>
  );
};

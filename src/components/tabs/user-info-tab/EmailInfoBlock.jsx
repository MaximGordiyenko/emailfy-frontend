import { AuthInput } from '../../forms/AuthInput.tsx';
import { AppButton } from '../../button/AppButton';
import { Flex, Typography, Form } from 'antd';
import './styles.css';
const { Title, Text } = Typography;

export const EmailInfoBlock = ({ control, errors, isLoading, handleSubmit, onSubmit }) => {
  return (
    <Flex vertical gap="large" rootClassName="user-email-address-block">
      <Flex vertical gap={1}>
        <Title level={4}>Email information</Title>
        <Text>Primary email address to be used for audience outreach</Text>
      </Flex>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AuthInput
          name={'email'}
          label={'Email Address'}
          placeholder={'youremail@mail.com'}
          type={'text'}
          control={control}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        />
        <Form.Item>
          <AppButton role="submit">{isLoading ? 'Loading...' : 'Setup new email'}</AppButton>
        </Form.Item>
      </Form>
    </Flex>
  );
};

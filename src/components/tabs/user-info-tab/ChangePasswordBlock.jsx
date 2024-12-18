import { AppButton } from '../../button/AppButton';
import { Flex, Form, Space, Typography } from 'antd';
import { AuthInput } from '../../forms/AuthInput.tsx';
import './styles.css';
const { Title, Text, Link } = Typography;

export const ChangePasswordBlock = ({
  control,
  errors,
  passwordTooltips,
  isUserLoading,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Flex vertical gap="large" rootClassName="user-change-psw-block">
      <Title level={4}>Change password</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AuthInput
          name={'currentPassword'}
          label={'Current password'}
          placeholder={'Enter your current password'}
          type={'password'}
          control={control}
          validateStatus={errors.currentPassword ? 'error' : ''}
          help={errors.currentPassword?.message}
        />

        <AuthInput
          name={'newPassword'}
          label={'New password'}
          placeholder={'Enter your new password'}
          type={'password'}
          tooltip={`${passwordTooltips}`}
          control={control}
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword?.message}
        />
        <AuthInput
          name={'repeatNewPassword'}
          label={'Repeat new password'}
          placeholder={'Enter your new password again'}
          type={'password'}
          tooltip={`${passwordTooltips}`}
          control={control}
          validateStatus={errors.repeatNewPassword ? 'error' : ''}
          help={errors.repeatNewPassword?.message}
        />
        <Form.Item>
          <AppButton role="submit">{isUserLoading ? 'Loading...' : 'Change password'}</AppButton>
        </Form.Item>
      </Form>
    </Flex>
  );
};

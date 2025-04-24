import { Form } from 'antd';
import { AppButton } from '../button/AppButton.jsx';
import { AuthTextArea } from '../forms/AuthTextArea.tsx';
import './styles.css';

export const ChatForm = ({ control, errors, isConnected, handleSubmit, onSubmit }) => {
  return (
    <Form layout="inline" className="chat-form-container" onFinish={handleSubmit(onSubmit)}>
      <AuthTextArea
        name={'chat'}
        type={'text'}
        placeholder={'Type a message...'}
        rows={2}
        allowClear
        control={control}
        validateStatus={errors.chat ? 'error' : ''}
        help={errors.chat?.message}
      />
      <Form.Item>
        <AppButton role="submit" size="middle" disabled={!isConnected}>Send</AppButton>
      </Form.Item>
    </Form>
  );
};

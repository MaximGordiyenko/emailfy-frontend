import { Form } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import { AppButton } from '../button/AppButton.jsx';
import { AuthTextArea } from '../forms/AuthTextArea.tsx';
import './styles.css';

export const ChatForm = ({ control, errors, handleSubmit, onSubmit, onKeyDown, disabled }) => {
  return (
    <Form layout="inline" className="chat-form-container" onFinish={handleSubmit(onSubmit)}>
      <AuthTextArea
        name={'message'}
        type={'text'}
        placeholder={'Type a message...'}
        rows={2}
        allowClear
        disabled={disabled}
        control={control}
        onKeyDown={onKeyDown}
        validateStatus={errors.message ? 'error' : ''}
        help={errors.message?.message}
      />
      <Form.Item>
        <AppButton
          disabled={disabled}
          icon={<SendOutlined/>}
          role="submit"
          size="middle">
          Send
        </AppButton>
      </Form.Item>
    </Form>
  );
};

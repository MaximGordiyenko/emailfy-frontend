import { Input, Form } from 'antd';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { AuthFormProps } from './types';

const { TextArea } = Input;

export const AuthTextArea: FC<AuthFormProps> = ({
  control,
  validateStatus,
  help,
  name,
  label,
  tooltip,
  placeholder,
  rows = 4,
  maxLength,
}) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help} tooltip={tooltip}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextArea {...field} rows={rows} placeholder={placeholder} maxLength={maxLength} />
        )}
      />
    </Form.Item>
  );
};

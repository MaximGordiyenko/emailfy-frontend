import { FC } from 'react';
import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { AuthFormProps } from './types';

export const AuthInput: FC<AuthFormProps> = ({
  control,
  validateStatus,
  help,
  name,
  label,
  tooltip,
  placeholder,
  type = 'text',
}) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help} tooltip={tooltip}>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === 'password' ? (
            <Input.Password {...field} placeholder={placeholder} />
          ) : (
            <Input {...field} placeholder={placeholder} />
          )
        }
      />
    </Form.Item>
  );
};

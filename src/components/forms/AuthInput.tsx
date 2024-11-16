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
  placeholder,
  type = 'text',
}) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help}>
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

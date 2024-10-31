import { FC } from 'react';
import { Form, Checkbox } from 'antd';
import { Controller } from 'react-hook-form';
import { AuthFormProps } from './types';

const CheckboxForm: FC<AuthFormProps> = ({ control, name, text }) => {
  return (
    <Form.Item>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
            {text}
          </Checkbox>
        )}
      />
    </Form.Item>
  );
};

export default CheckboxForm;

import { FC } from 'react';
import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { AuthFormProps } from './types';
// @ts-ignore
import { showRequiredLabel } from '../../helpers/ShowRequiredLabel.tsx';

const {Item} = Form;
const {Password} = Input;

export const AuthInput: FC<AuthFormProps> = ({
                                               control,
                                               validateStatus,
                                               help,
                                               name,
                                               label,
                                               required = false,
                                               disabled,
                                               tooltip,
                                               placeholder,
                                               size,
                                               prefix,
                                               allowClear,
                                               addonAfter,
                                               type = 'text'
                                             }) => {
  return (
    <Item
      label={label && showRequiredLabel(label, required)}
      validateStatus={validateStatus}
      help={help}
      tooltip={tooltip}
      layout="vertical">
      <Controller
        name={name}
        control={control}
        render={({field}) =>
          type === 'password' ? (
            <Password {...field} placeholder={placeholder}/>
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              size={size}
              disabled={disabled}
              prefix={prefix}
              allowClear={allowClear}
              addonAfter={addonAfter}
            />
          )
        }
      />
    </Item>
  );
};

import { UseControllerProps } from 'react-hook-form';
import { ReactNode } from 'react';

export interface AuthFormProps extends UseControllerProps<any> {
  label?: string;
  required?: boolean;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating' | '';
  help?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  text?: string;
  tooltip?: string;
  value?: string;
  name: string;
  rows?: number;
  size?: string;
  prefix?: ReactNode;
  allowClear?: boolean | ReactNode;
  addonAfter?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
}

import { UseControllerProps } from 'react-hook-form';

export interface AuthFormProps extends UseControllerProps<any> {
  label: string;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating' | '';
  help?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  text?: string;
  tooltip?: string;
  value?: string;
  name: string;
  rows?: number;
  maxLength?: number;
}

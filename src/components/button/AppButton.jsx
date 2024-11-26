import { Button } from 'antd';
import './styles.css';

export const AppButton = ({
  variant = 'primary',
  onClick,
  disabled,
  role,
  label,
  icon,
  children,
}) => {
  const buttonRoles = {
    ...(role === 'submit' ? { htmlType: 'submit' } : {}),
    ...(role === 'text' ? { type: 'text' } : {}),
  };

  return (
    <Button
      type={variant}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
      iconPosition="end"
      size="large"
      {...buttonRoles}>
      {label || children}
    </Button>
  );
};

import { Button } from 'antd';
import './styles.css';

export const AppButton = ({
  variant = 'primary',
  kind,
  onClick,
  disabled,
  role,
  label,
  icon,
  color,
  children,
}) => {
  const buttonRoles = {
    ...(role === 'submit' ? { htmlType: 'submit' } : {}),
    ...(role === 'text' ? { type: 'text' } : {}),
  };

  return (
    <Button
      type={variant}
      variant={kind}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
      color={color}
      iconPosition="end"
      size="large"
      {...buttonRoles}>
      {label || children}
    </Button>
  );
};

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
                            iconPosition = 'end',
                            color,
                            size = 'large',
                            children
                          }) => {
  const buttonRoles = {
    ...(role === 'submit' ? { htmlType: 'submit' } : {}),
    ...(role === 'text' ? { type: 'text' } : {})
  };
  
  return (
    <Button
      type={variant}
      variant={kind}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
      color={color}
      iconPosition={iconPosition}
      size={size}
      {...buttonRoles}>
      {label || children}
    </Button>
  );
};

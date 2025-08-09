import { Button } from 'antd';
import './styles.css';

export const AppButton = ({
                            variant = 'primary',
                            key,
                            className,
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
      key={key}
      type={variant}
      variant={kind}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
      color={color}
      iconPosition={iconPosition}
      size={size}
      className={className}
      {...buttonRoles}>
      {label || children}
    </Button>
  );
};

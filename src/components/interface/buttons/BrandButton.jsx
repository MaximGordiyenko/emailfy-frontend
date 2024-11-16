import './styles.css';

export const BrandButton = ({ type, className, variant, onClick, text, icon, disabled }) => {
  return (
    <button
      type={type || 'button'}
      className={`brand-button-styles brand-btn-variant-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
      {icon}
    </button>
  );
};

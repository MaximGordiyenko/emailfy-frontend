import './styles.css';

export const TextIconWrapper = ({ className, children }) => {
  return <div className={`text-and-icon-wrapper ${className}`}>{children}</div>;
};

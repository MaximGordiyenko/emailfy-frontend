import './styles.css';

export const TextIconButton = ({ icon, onClick, className, text }) => {
  return (
    <div className={className} onClick={onClick}>
      <span className="btn-preview-text">{text}</span>
      {icon}
    </div>
  );
};

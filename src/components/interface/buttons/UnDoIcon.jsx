import './styles.css';

export const UnDoIcon = ({ onClick, className }) => {
  return (
    <svg
      onClick={onClick}
      className={`undo-icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 7H15C17.7614 7 20 9.23857 20 12C20 14.7614 17.7614 17 15 17H8.00001M4 7L7 4M4 7L7 10"
        stroke="#2A2B3B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

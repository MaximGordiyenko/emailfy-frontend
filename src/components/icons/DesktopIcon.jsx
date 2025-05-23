import './styles.css';

export const DesktopIcon = ({ className, onClick }) => {
  return (
    <svg
      className={`media-query-icon-btn${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none">
      <path
        d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
        stroke="#2A2B3B"
        strokeWidth="1.5"
      />
      <path d="M22 21H2" stroke="#2A2B3B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 15H9" stroke="#2A2B3B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

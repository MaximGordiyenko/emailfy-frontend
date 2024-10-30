import './styles.css';

export const ContinueIconButton = () => {
  return (
    <div className="toolbar-btn-wrapper continue-btn">
      <svg
        className="continue-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 21 21"
        fill="none">
        <path
          d="M9.91797 16.3334L14.918 10.5001L9.91797 4.66675"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.58203 16.3332L11.582 10.4998L6.58203 4.6665"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="toolbar-btn-text">Continue</span>
    </div>
  );
};

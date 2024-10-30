import './styles.css';

export const EmojisIconButton = () => {
  return (
    <div className="toolbar-btn-wrapper emojis-btn">
      <svg
        className="emojis-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 20 21"
        fill="none">
        <path
          d="M15.302 7.20839L14.7127 6.61913C12.1092 4.01563 7.88815 4.01563 5.28465 6.61913C2.68116 9.22262 2.68116 13.4437 5.28465 16.0472C7.88815 18.6507 12.1092 18.6507 14.7127 16.0472C16.2268 14.5332 16.8603 12.4721 16.6134 10.5003M15.302 7.20839H11.7665M15.302 7.20839V3.67285"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="toolbar-btn-text">Emojis</span>
    </div>
  );
};

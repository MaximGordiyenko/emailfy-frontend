import './styles.css';

export const RoundCloseIcon = ({ onClick, className }) => (
  <svg
    className={`icon-button_close ${className}`}
    onClick={onClick}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="Close button">
      <circle id="Vector" cx="20.0007" cy="20.0007" r="16.6667" fill="#EAEAEC" />
      <path
        id="Vector_2"
        d="M24.1673 15.834L15.834 24.1673M15.8339 15.834L24.1672 24.1673"
        stroke="#2A2B3B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

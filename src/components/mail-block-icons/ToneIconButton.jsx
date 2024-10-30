import './styles.css';

export const ToneIconButton = () => {
  return (
    <div className="toolbar-btn-wrapper tone-btn">
      <svg
        className="tone-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 20 21"
        fill="none">
        <path
          d="M7.5 13.8333C8.20865 14.3585 9.07047 14.6666 10 14.6666C10.9295 14.6666 11.7914 14.3585 12.5 13.8333"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="12.5013" cy="9.25" rx="0.833333" ry="1.25" fill="#6A6B76" />
        <ellipse cx="7.5013" cy="9.25" rx="0.833333" ry="1.25" fill="#6A6B76" />
        <path
          d="M18.3346 12.1667C18.3346 15.3094 18.3346 16.8808 17.3583 17.8571C16.382 18.8334 14.8107 18.8334 11.668 18.8334"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.33464 18.8334C5.19194 18.8334 3.62059 18.8334 2.64428 17.8571C1.66797 16.8808 1.66797 15.3094 1.66797 12.1667"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.33464 2.16675C5.19194 2.16675 3.62059 2.16675 2.64428 3.14306C1.66797 4.11937 1.66797 5.69072 1.66797 8.83341"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.668 2.16675C14.8107 2.16675 16.382 2.16675 17.3583 3.14306C18.3346 4.11937 18.3346 5.69072 18.3346 8.83341"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="toolbar-btn-text">Tone</span>
    </div>
  );
};

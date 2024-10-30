import './styles.css';

export const ShortenIconButton = () => {
  return (
    <div className="toolbar-btn-wrapper shorten-btn">
      <svg
        className="shorten-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 20 21"
        fill="none">
        <path
          d="M1.66797 18.8333L7.5013 13M7.5013 13H2.62035M7.5013 13V17.881"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.332 2.16667L12.4987 8M12.4987 8H17.3797M12.4987 8V3.11905"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="toolbar-btn-text">Shorten</span>
    </div>
  );
};

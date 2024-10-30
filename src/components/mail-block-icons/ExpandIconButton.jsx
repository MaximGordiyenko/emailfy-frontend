import './styles.css';

export const ExpandIconButton = () => {
  return (
    <div className="toolbar-btn-wrapper expand-btn">
      <svg
        className="expand-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 21 21"
        fill="none">
        <path
          d="M7.75 12.9999L1.91667 18.8333M1.91667 18.8333H6.79762M1.91667 18.8333V13.9523"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 8.00008L18.5833 2.16675M18.5833 2.16675H13.7024M18.5833 2.16675V7.0477"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="toolbar-btn-text">Expand</span>
    </div>
  );
};

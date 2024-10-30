import './styles.css';

export const ListIcon = () => {
  return (
    <>
      <svg
        className="building-icon list-icon"
        width="65"
        height="47"
        viewBox="0 0 65 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          opacity="0.2"
          x="0.00390625"
          y="0.167969"
          width="40"
          height="10"
          rx="5"
          fill="#2A2B3B"
        />
        <circle opacity="0.4" cx="7.00391" cy="20.168" r="4" fill="#2A2B3B" />
        <rect opacity="0.4" x="14.0039" y="17.168" width="40" height="6" rx="3" fill="#2A2B3B" />
        <circle opacity="0.4" cx="7.00391" cy="31.168" r="4" fill="#2A2B3B" />
        <rect opacity="0.4" x="14.0039" y="28.168" width="50" height="6" rx="3" fill="#2A2B3B" />
        <circle opacity="0.4" cx="7.00391" cy="42.168" r="4" fill="#2A2B3B" />
        <rect opacity="0.4" x="14.0039" y="39.168" width="30" height="6" rx="3" fill="#2A2B3B" />
      </svg>
      <p className="building-text">List</p>
    </>
  );
};

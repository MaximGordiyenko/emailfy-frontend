import './styles.css';

export const HeaderIcon = () => {
  return (
    <>
      <svg
        className="building-icon header-icon"
        width="60"
        height="34"
        viewBox="0 0 60 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.4" width="40" height="10" rx="5" fill="#2A2B3B" />
        <rect opacity="0.2" y="16" width="50" height="4" rx="2" fill="#2A2B3B" />
        <rect opacity="0.2" y="23" width="60" height="4" rx="2" fill="#2A2B3B" />
        <rect opacity="0.2" y="30" width="40" height="4" rx="2" fill="#2A2B3B" />
      </svg>
      <p className="building-text">Header</p>
    </>
  );
};

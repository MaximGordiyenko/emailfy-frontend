export const SearchIcon = ({ position = 'left', onClick }) => {
  return (
    <svg
      className={`brand-search-icon position-${position}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none">
      <g clipPath="url(#clip0_12734_5829)">
        <circle cx="7.66536" cy="7.66536" r="6.33333" stroke="#AAAAB1" strokeWidth="1.5" />
        <path
          d="M13.332 13.332L14.6654 14.6654"
          stroke="#AAAAB1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_12734_5829">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

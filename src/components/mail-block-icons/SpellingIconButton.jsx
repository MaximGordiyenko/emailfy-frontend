import './styles.css';

export const SpellingIconButton = () => {
  return (
    <div className="toolbar-btn-wrapper spelling-btn">
      <svg
        className="spelling-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 21 21"
        fill="none">
        <path
          d="M14.128 3.3793L14.6687 2.83862C15.5645 1.94279 17.0169 1.94279 17.9128 2.83862C18.8086 3.73445 18.8086 5.18687 17.9128 6.0827L17.3721 6.62338M14.128 3.3793C14.128 3.3793 14.1956 4.52824 15.2094 5.54202C16.2231 6.55579 17.3721 6.62338 17.3721 6.62338M14.128 3.3793L9.15728 8.35002C8.82061 8.6867 8.65227 8.85504 8.50749 9.04065C8.33671 9.2596 8.1903 9.49651 8.07083 9.74718C7.96956 9.95968 7.89428 10.1855 7.74371 10.6372L7.26165 12.0834M17.3721 6.62338L12.4014 11.5941C12.0647 11.9308 11.8963 12.0991 11.7107 12.2439C11.4918 12.4147 11.2549 12.5611 11.0042 12.6805C10.7917 12.7818 10.5659 12.8571 10.1142 13.0077L8.66797 13.4897M8.66797 13.4897L7.73221 13.8017C7.50992 13.8757 7.26485 13.8179 7.09917 13.6522C6.93349 13.4865 6.87563 13.2415 6.94973 13.0192L7.26165 12.0834M8.66797 13.4897L7.26165 12.0834"
          stroke="#6A6B76"
          strokeWidth="1.5"
        />
        <path
          d="M18.5846 10.5001C18.5846 15.1025 14.8537 18.8334 10.2513 18.8334C5.64893 18.8334 1.91797 15.1025 1.91797 10.5001C1.91797 5.89771 5.64893 2.16675 10.2513 2.16675"
          stroke="#6A6B76"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="toolbar-btn-text">Spelling</span>
    </div>
  );
};

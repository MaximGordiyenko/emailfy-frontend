import './styles.css';

export const DividerIcon = () => {
  return (
    <>
      <svg
        className="building-icon divider-icon"
        width="101"
        height="79"
        viewBox="0 0 101 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="21.5" y="10.5" width="58" height="24" rx="5" fill="#D4D5D8" />
        <rect x="10.5" y="37.5" width="80" height="4" rx="2" fill="#AAAAB1" />
        <rect x="21.5" y="44.5" width="58" height="24" rx="5" fill="#D4D5D8" />
      </svg>
      <p className="building-text">Divider</p>
    </>
  );
};

import './styles.css';

export const SpacingIcon = () => {
  return (
    <>
      <svg
        className="building-icon spacing-icon"
        width="90"
        height="77"
        viewBox="0 0 90 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10.5" width="70" height="14" rx="5" fill="#D4D5D8" />
        <path
          d="M45.7071 27.7929C45.3166 27.4024 44.6834 27.4024 44.2929 27.7929L37.9289 34.1569C37.5384 34.5474 37.5384 35.1805 37.9289 35.5711C38.3195 35.9616 38.9526 35.9616 39.3431 35.5711L45 29.9142L50.6569 35.5711C51.0474 35.9616 51.6805 35.9616 52.0711 35.5711C52.4616 35.1805 52.4616 34.5474 52.0711 34.1569L45.7071 27.7929ZM44.2929 49.2071C44.6834 49.5976 45.3166 49.5976 45.7071 49.2071L52.0711 42.8431C52.4616 42.4526 52.4616 41.8195 52.0711 41.4289C51.6805 41.0384 51.0474 41.0384 50.6569 41.4289L45 47.0858L39.3431 41.4289C38.9526 41.0384 38.3195 41.0384 37.9289 41.4289C37.5384 41.8195 37.5384 42.4526 37.9289 42.8431L44.2929 49.2071ZM44 28.5L44 48.5L46 48.5L46 28.5L44 28.5Z"
          fill="#AAAAB1"
        />
        <rect opacity="0.2" x="10" y="52.5" width="70" height="14" rx="5" fill="#2A2B3B" />
      </svg>
      <p className="building-text">Spacing</p>
    </>
  );
};

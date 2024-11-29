import './styles.css';

export const StickyIcon = ({ id, style, isActive, onClick, Icon }) => (
  <button
    id={id}
    className={`icon-button${isActive ? ' is-active' : ''}`}
    style={style}
    onClick={onClick}>
    <Icon />
  </button>
);

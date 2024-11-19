import './style.scss';
export const Button = ({ onClick, name, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      {name}
    </button>
  );
};

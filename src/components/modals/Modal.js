import './style.scss';

export const Modal = ({ isOpen, children }) => {
  return (
    <div className={`app-modal${isOpen ? ' open' : ''}`}>
      <div className={'modal-window'}>{children}</div>
    </div>
  );
};

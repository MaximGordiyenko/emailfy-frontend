import './styles.css';

export const Button = ({ btnText, isFilled, onClick, disabled, isSubmit }) => {
  let buttonClass = 'border-btn';

  if (isFilled) {
    buttonClass = 'filled-btn';
  }
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={isSubmit && 'submit'}>
      <span className={'btn-text'}>{btnText}</span>
    </button>
  );
};

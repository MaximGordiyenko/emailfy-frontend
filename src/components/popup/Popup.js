import './styles.css';
export const Popup = ({ content, isShow, close }) => {
  return (
    <>
      {isShow && <div className={isShow ? 'popup-wrapper' : 'hidden-popup-wrapper'}>{content}</div>}
    </>
  );
};

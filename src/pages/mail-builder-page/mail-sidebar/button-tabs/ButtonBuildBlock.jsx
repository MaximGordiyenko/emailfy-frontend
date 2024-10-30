import DOMPurify from 'dompurify';
import { DeleteStickyIcon } from '../../../../components/interface/Buttons/DeleteStickyIcon';
import '../styles.css';

export const ButtonBuildBlock = ({
  id,
  text,
  style,
  isActive,
  onClick,
  showMailPreview,
  onClickRemoveBuildBlock,
}) => {
  const isActiveBorderOnHover = !showMailPreview ? ' is-hover-block' : '';
  const isActiveBorderOnClick = isActive && !showMailPreview ? ' is-active-content-border' : '';

  return (
    <>
      <button
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} button-build-block`}
        style={style}
        onClick={onClick}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text),
        }}
      />
      <DeleteStickyIcon
        showMailPreview={showMailPreview}
        isActive={isActive}
        onClick={onClickRemoveBuildBlock}
      />
    </>
  );
};

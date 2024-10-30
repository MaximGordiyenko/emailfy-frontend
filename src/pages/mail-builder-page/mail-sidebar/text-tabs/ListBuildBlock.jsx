import DOMPurify from 'dompurify';
import '../styles.css';
import { DeleteStickyIcon } from '../../../../components/interface/Buttons/DeleteStickyIcon';

export const ListBuildBlock = ({
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
      <ul
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} list-build-block`}
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

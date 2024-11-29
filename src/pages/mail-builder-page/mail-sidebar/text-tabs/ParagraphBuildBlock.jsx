import DOMPurify from 'dompurify';
import { DeleteStickyIcon } from '../../../../components/icons/DeleteStickyIcon';
import '../styles.css';

export const ParagraphBuildBlock = ({
  id,
  text,
  style,
  isActive,
  onClick,
  showMailPreview,
  onClickRemoveBuildBlock,
}) => {
  let isActiveBorderOnHover = !showMailPreview ? ' is-hover-block' : '';
  let isActiveBorderOnClick = isActive && !showMailPreview ? ' is-active-content-border' : '';

  return (
    <>
      <span
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} paragraph-build-block`}
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

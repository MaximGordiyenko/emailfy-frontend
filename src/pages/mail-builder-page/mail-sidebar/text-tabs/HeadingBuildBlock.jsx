import DOMPurify from 'dompurify';
import { DeleteStickyIcon } from '../../../../components/icons/DeleteStickyIcon';
import '../styles.css';

export const HeadingBuildBlock = ({
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
      <h4
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} heading-build-block`}
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

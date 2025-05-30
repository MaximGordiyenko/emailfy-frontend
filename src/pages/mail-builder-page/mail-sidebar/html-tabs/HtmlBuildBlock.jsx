import DOMPurify from 'dompurify';
import { DeleteStickyIcon } from '../../../../components/icons/DeleteStickyIcon';

export const HtmlBuildBlock = ({
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
    <div
      id={id}
      style={style}
      onClick={onClick}
      className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} html-build-block`}>
      <code
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text),
        }}
      />
      <DeleteStickyIcon
        showMailPreview={showMailPreview}
        isActive={isActive}
        onClick={onClickRemoveBuildBlock}
      />
    </div>
  );
};

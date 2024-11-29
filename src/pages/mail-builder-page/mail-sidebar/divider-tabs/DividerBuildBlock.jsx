import { DeleteStickyIcon } from '../../../../components/icons/DeleteStickyIcon';
import '../styles.css';

export const DividerBuildBlock = ({
  id,
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
      <hr
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} divider-build-block`}
        style={style}
        onClick={onClick}
      />
      <DeleteStickyIcon
        showMailPreview={showMailPreview}
        isActive={isActive}
        onClick={onClickRemoveBuildBlock}
      />
    </>
  );
};

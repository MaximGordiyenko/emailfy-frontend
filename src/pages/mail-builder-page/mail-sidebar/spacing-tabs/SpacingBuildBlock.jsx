import '../styles.css';
import { DeleteStickyIcon } from '../../../../components/interface/buttons/DeleteStickyIcon';

export const SpacingBuildBlock = ({
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
      <div
        id={id}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} spacing-build-block`}
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

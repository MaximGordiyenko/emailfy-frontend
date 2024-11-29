import { InstagramIcon } from '../../../../components/mail-block-icons/InstagramIcon';
import { TwitterIcon } from '../../../../components/mail-block-icons/TwitterIcon';
import { FacebookIcon } from '../../../../components/mail-block-icons/FacebookIcon';
import { LinkedIn } from '../../../../components/mail-block-icons/LinkedIn';
import { DeleteStickyIcon } from '../../../../components/icons/DeleteStickyIcon';

export const SocialBuildBlock = ({
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
        style={style}
        onClick={onClick}
        className={`tag-content${isActiveBorderOnHover}${isActiveBorderOnClick} social-build-block`}>
        <InstagramIcon />
        <TwitterIcon />
        <FacebookIcon />
        <LinkedIn />
      </div>
      <DeleteStickyIcon
        showMailPreview={showMailPreview}
        isActive={isActive}
        onClick={onClickRemoveBuildBlock}
      />
    </>
  );
};

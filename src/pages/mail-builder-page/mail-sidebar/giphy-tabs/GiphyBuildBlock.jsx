import { useContext } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuidv4 } from 'uuid';
import { DeleteStickyIcon } from '../../../../components/icons/DeleteStickyIcon';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';
import * as builderScript from '../../builder-script/builderScript';
import '../styles.css';

export const GiphyBuildBlock = ({
  id,
  style,
  params,
  isActive,
  onClick,
  showMailPreview,
  onClickRemoveBuildBlock,
  mode,
}) => {
  const { setMailEditorState } = useContext(MailBuilderContext);

  const isActiveBorderOnHover = !showMailPreview ? ' is-hover-block' : '';
  const isActiveBorderOnClick = isActive && !showMailPreview ? ' is-active-content-border' : '';
  const isDropGiphyHerePlaceholder = params.url
    ? ''
    : !showMailPreview
      ? ' drop-your-content-here'
      : '';

  return (
    <>
      <div
        id={id}
        className={`giphy-container${isActiveBorderOnHover}${isActiveBorderOnClick}`}
        onClick={onClick}
        style={style}>
        <ReactSortable
          list={[]}
          setList={(newGifState) => {
            if (!newGifState.length) return;
            setMailEditorState((prevState) => {
              return builderScript.updateBlockById(
                prevState,
                id,
                'url',
                newGifState[0]?.images?.preview_gif?.url,
              );
            });
          }}
          id={id}
          clone={(item) => ({ ...item, id: uuidv4() })}
          group={{
            name: 'giphy-list',
            put: ['giphy-block'],
          }}
          animation={200}
          className={`giphy-build-block${isDropGiphyHerePlaceholder}`}>
          {!isDropGiphyHerePlaceholder && (
            <img src={params?.url} alt="giphy" onClick={() => {}} className="giphy-image-block" />
          )}
        </ReactSortable>
      </div>
      <DeleteStickyIcon
        showMailPreview={showMailPreview}
        isActive={isActive}
        onClick={onClickRemoveBuildBlock}
      />
    </>
  );
};

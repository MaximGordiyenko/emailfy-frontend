import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ReactSortable } from 'react-sortablejs';
import { DeleteStickyIcon } from '../../../../components/interface/Buttons/DeleteStickyIcon';
import { findBlockById } from '../../builder-script/builderScript';
import '../styles.css';
import * as builderScript from '../../builder-script/builderScript';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';

export const VideoBuildBlock = ({
  id,
  url,
  style,
  isActive,
  onClick,
  showMailPreview,
  onClickRemoveBuildBlock,
}) => {
  const { mailEditorState, setMailEditorState } = useContext(MailBuilderContext);
  const imgRef = useRef(null);

  const videoBuildBlock = findBlockById(mailEditorState, id);

  const isActiveBorderOnHover = !showMailPreview ? ' is-hover-block' : '';
  const isActiveBorderOnClick = isActive && !showMailPreview ? ' is-active-content-border' : '';
  const isDropVideoHerePlaceholder = videoBuildBlock?.params?.url
    ? ''
    : !showMailPreview
      ? ' drop-your-content-here no-linkable-content'
      : '';

  useEffect(() => {
    if (imgRef.current?.clientHeight) {
      setMailEditorState((prevState) =>
        builderScript.updateBlockById(prevState, id, 'style', {
          ...style,
          height: imgRef.current.clientHeight,
          width: imgRef.current.clientWidth,
        }),
      );
    }
  }, [imgRef.current?.clientHeight]);

  return (
    <>
      <div
        id={id}
        className={`video-container${isActiveBorderOnHover}${isActiveBorderOnClick}`}
        onClick={onClick}
        style={style}>
        <ReactSortable
          key={id}
          id={id}
          list={mailEditorState}
          setList={() => {}}
          group={{
            name: 'video-list',
            pull: true,
          }}
          sort={true}
          clone={(item) => ({ ...item, id: uuidv4() })}
          animation={200}
          className={`video-build-block${isDropVideoHerePlaceholder}${showMailPreview ? '' : ' no-linkable-content'}`}>
          {!isDropVideoHerePlaceholder && (
            <Link
              key={videoBuildBlock.id}
              to={`${videoBuildBlock?.params?.video}`}
              target="_blank"
              className="link-of-player">
              <img
                ref={imgRef}
                src={videoBuildBlock?.params?.url}
                alt="video-block"
                width={'100%'}
                height={'100%'}
                className="image-of-player"
              />
              <div className="button-of-player" />
            </Link>
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

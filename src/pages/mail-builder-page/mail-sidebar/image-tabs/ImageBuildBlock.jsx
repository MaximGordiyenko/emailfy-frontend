import { useEffect, useContext } from 'react';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';

import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

import { ImageUploaderIcon } from '../../../../components/mail-block-icons/ImageUploaderIcon';
import { DeleteStickyIcon } from '../../../../components/interface/buttons/DeleteStickyIcon';

import * as resourceManager from '../../builder-script/resourceManager';
import * as builderScript from '../../builder-script/builderScript';
import * as builderTemplate from '../../builder-script/builderTemplate';

import '../styles.css';

export const ImageBuildBlock = ({
  params,
  id,
  isActive,
  onClick,
  showMailPreview,
  onClickRemoveBuildBlock,
  mode,
}) => {
  const { setMailEditorState, mailEditorState } = useContext(MailBuilderContext);

  const { getRootProps, getInputProps, open, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        console.log(`%c file of drop:`, `color: #f0c60a`, file);
        (async () => {
          await builderTemplate.saveScript(mailEditorState);
          const data = await resourceManager.uploadResource(file, uuidv4());
          console.log(file);
          if (params?.resource_id) {
            await resourceManager.removeResource(params.resource_id);
          }
          setMailEditorState((prevState) => {
            let newState = builderScript.updateBlockById(prevState, id, 'resource_id', data.id);
            newState = builderScript.updateBlockById(newState, id, 'cid', data.cid);
            builderTemplate.saveScript(newState);
            return newState;
          });
        })();
      });
    },
  });

  const getTempUrl = async () => {
    return await resourceManager.getResourceTempURL(params.resource_id);
  };

  useEffect(() => {
    if (params?.resource_id) {
      getTempUrl().then((url) => {
        setMailEditorState((prevState) => builderScript.updateBlockById(prevState, id, 'url', url));
      });
    }
  }, [params?.resource_id]);

  const isDrag = isDragAccept ? ' is-drag-accept' : '';
  const isReject = isDragReject ? ' is-drag-reject' : '';
  const isActiveBorderOnHover = !showMailPreview ? ' is-hover-block' : '';
  const isActiveBorderOnClick = isActive && !showMailPreview ? ' is-active-content-border' : '';

  return mode === 'final' ? (
    <>
      <img src={`cid:${params.cid}`} alt="bla" width="100%" />
    </>
  ) : (
    <div
      {...getRootProps({
        className: `tag-content${isActiveBorderOnHover}${isActiveBorderOnClick}${isDrag}${isReject} image-build-block`,
      })}
      id={id}
      onClick={onClick}>
      <input {...getInputProps({ className: 'dropzone-input' })} />
      {params?.url ? (
        <>
          <aside className="previews">
            <img src={params?.url} alt={params?.url} width="100%" />
          </aside>
          <DeleteStickyIcon
            showMailPreview={showMailPreview}
            isActive={isActive}
            onClick={onClickRemoveBuildBlock}
          />
        </>
      ) : (
        <>
          {!showMailPreview && (
            <div className="dropzone-container">
              <ImageUploaderIcon />
              <p className="dropzone-placeholder-text">
                Drop the image here or{' '}
                <span className="dropzone-placeholder-link" onClick={open}>
                  Browse
                </span>
              </p>
            </div>
          )}
          <DeleteStickyIcon
            showMailPreview={showMailPreview}
            isActive={isActive}
            onClick={onClickRemoveBuildBlock}
          />
        </>
      )}
    </div>
  );
};

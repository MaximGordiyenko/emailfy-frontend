import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { MailBuilderContext } from '../../context/MailBuilderContext';
import * as builderTemplate from '../../pages/mail-builder-page/builder-script/builderTemplate';
import * as resourceManager from '../../pages/mail-builder-page/builder-script/resourceManager';
import * as builderScript from '../../pages/mail-builder-page/builder-script/builderScript';
import './styles.css';

export const ImageUploader = ({ id, onClickDeleteImage }) => {
  const { setMailEditorState, mailEditorState, selectedMailEditorBlock } =
    useContext(MailBuilderContext);

  const { getRootProps, getInputProps, open, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        (async () => {
          await builderTemplate.saveScript(mailEditorState);
          const data = await resourceManager.uploadResource(file, uuidv4());
          if (selectedMailEditorBlock?.params?.resource_id) {
            await resourceManager.removeResource(selectedMailEditorBlock?.params.resource_id);
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

  const isDrag = isDragAccept ? ' is-drag-accept' : '';
  const isReject = isDragReject ? ' is-drag-reject' : '';

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onClickDeleteImage();
  };
  console.log('image params:', selectedMailEditorBlock?.params?.url);
  return (
    <div {...getRootProps({ className: `${isDrag}${isReject} drop-image-container` })} id={id}>
      <input {...getInputProps({ className: 'dropzone-input' })} />
      {selectedMailEditorBlock?.params?.url ? (
        <aside className="drop-image-preview">
          <img
            src={selectedMailEditorBlock?.params?.url}
            alt={selectedMailEditorBlock?.params?.url}
            width="100%"
          />
          <button onClick={handleDeleteClick}>Delete Image</button>
        </aside>
      ) : (
        <div className="drop-image-placeholder">
          <p className="drop-image-placeholder-text">
            Drop the image here or{' '}
            <span className="drop-image-placeholder-link" onClick={open}>
              Browse
            </span>
          </p>
          <p className="drop-image-placeholder-abbr">.png .jpeg .gif</p>
        </div>
      )}
    </div>
  );
};

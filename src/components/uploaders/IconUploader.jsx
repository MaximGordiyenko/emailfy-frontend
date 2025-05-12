import { useContext, useEffect } from 'react';
import { MailBuilderContext } from '../../context/MailBuilderContext';
import { useDropzone } from 'react-dropzone';
import * as builderTemplate from '../../pages/mail-builder-page/builder-script/builderTemplate';
import * as resourceManager from '../../pages/mail-builder-page/builder-script/resourceManager';
import { v4 as uuidv4 } from 'uuid';
import * as builderScript from '../../pages/mail-builder-page/builder-script/builderScript';

export const IconUploader = ({ id, children }) => {
  const { mailEditorState, setMailEditorState, selectedMailEditorBlock, selectedBlockID } =
    useContext(MailBuilderContext);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
  });

  useEffect(() => {
    (async () => {
      await builderTemplate.saveScript(mailEditorState);
      const uuID = uuidv4();
      const file = new File([new Blob([`${children}`])], uuID);
      const data = await resourceManager.uploadResource(file, uuID);
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
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <img src={children} alt="icon" onClick={open} style={{ cursor: 'pointer' }} />
    </div>
  );
};

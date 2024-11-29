import { useState, useContext, useEffect } from 'react';
import { Accordion } from '../../../../components/accordion/Accordion';
import uploadIcon from '../../../../assets/images/uploadIcon.svg';
import alternateTextIcon from '../../../../assets/images/alternateTextIcon.svg';
import { SearchIcon } from '../../../../components/icons/SearchIcon';
import { BrandInput } from '../../../../components/inputs/BrandInput';
import { ImageUploader } from '../../../../components/drag-n-drop-uploader/ImageUploader';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';
import * as resourceManager from '../../builder-script/resourceManager';
import * as builderScript from '../../builder-script/builderScript';
import * as builderTemplate from '../../builder-script/builderTemplate';
import '../styles.css';

export const ImageEditor = () => {
  const [searchImageUrl, setSearchImageUrl] = useState('');

  const { setMailEditorState, selectedBlockID, selectedMailEditorBlock } =
    useContext(MailBuilderContext);

  const getTempUrl = async () => {
    return await resourceManager.getResourceTempURL(selectedMailEditorBlock?.params.resource_id);
  };

  useEffect(() => {
    if (selectedMailEditorBlock?.params?.resource_id) {
      getTempUrl().then((url) => {
        setMailEditorState((prevState) =>
          builderScript.updateBlockById(prevState, selectedBlockID, 'url', url),
        );
      });
    }
  }, [selectedMailEditorBlock?.params?.resource_id]);

  const removeBuildingBlock = async () => {
    setMailEditorState((prevState) => {
      const state = builderScript.removeBlockById(prevState, selectedBlockID);
      builderTemplate.saveScript(state);
      return state;
    });
    if (selectedMailEditorBlock?.params?.resource_id) {
      await resourceManager.removeResource(selectedMailEditorBlock?.params?.resource_id);
    }
  };

  return (
    <div className="image-editor-container">
      <Accordion icon={uploadIcon} title="Upload Image">
        <ImageUploader id={selectedBlockID} onClickDeleteImage={removeBuildingBlock} />
        <BrandInput
          value={searchImageUrl}
          onChange={({ target: { value } }) => setSearchImageUrl(value)}
          placeholder="Enter url"
        />
      </Accordion>
      <Accordion icon={alternateTextIcon} title="Alternate text">
        <BrandInput
          leftIcon={<SearchIcon />}
          value={selectedMailEditorBlock?.params?.alt || ''}
          onChange={({ target: { value } }) => {
            (async () => {
              setMailEditorState((prevState) => {
                let newState = builderScript.updateBlockById(
                  prevState,
                  selectedBlockID,
                  'alt',
                  value,
                );
                builderTemplate.saveScript(newState);
                return newState;
              });
            })();
          }}
          placeholder="Enter alternative text"
        />
      </Accordion>
    </div>
  );
};

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '../../../../components/accordion/Accordion';
import uploadIcon from '../../../../assets/images/uploadIcon.svg';
import alternateTextIcon from '../../../../assets/images/alternateTextIcon.svg';
import { BrandInput } from '../../../../components/inputs/BrandInput';
import { CloseIcon } from '../../../../components/icons/CloseIcon';
import * as builderScript from '../../builder-script/builderScript';
import '../styles.css';
import { get_video_preview_image } from '../../../../api/builder/builder_test';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';

export const VideoEditor = () => {
  const { selectedMailEditorBlock, setMailEditorState, mailEditorState } =
    useContext(MailBuilderContext);

  const onChangeVideoContent = async ({ target: { value } }) => {
    setMailEditorState((prevState) =>
      builderScript.updateBlockById(prevState, selectedMailEditorBlock.id, 'video', value),
    );

    try {
      const vimeoEmbedUrl = await get_video_preview_image(value);
      const youTubeId = value?.split('v=')[1]?.split('&')[0];
      const youTubeEmbedUrl = `https://img.youtube.com/vi/${youTubeId}/0.jpg`;

      // Choose which URL to use based on availability
      const result = vimeoEmbedUrl ? vimeoEmbedUrl : youTubeEmbedUrl;

      setMailEditorState((prevState) =>
        builderScript.updateBlockById(prevState, selectedMailEditorBlock.id, 'url', result),
      );
    } catch (error) {
      console.error('Error fetching video preview image:', error);
    }
  };

  const onDeleteVideoContent = (value) => {
    setMailEditorState((prevState) =>
      builderScript.updateBlockById(prevState, selectedMailEditorBlock.id, 'url', value),
    );
  };

  const videoBuildBlock = builderScript.findBlockById(mailEditorState, selectedMailEditorBlock.id);

  return (
    <div className="video-editor-container">
      <Accordion icon={uploadIcon} title="Upload Video">
        <sub>https://www.youtube.com/watch?v=Mcr_b0T7nd8&themeRefresh=1</sub>
        <hr />
        <sub>https://vimeo.com/841329419</sub>
        <BrandInput
          // leftIcon={<SearchIcon />}
          rightIcon={<CloseIcon onClick={() => onDeleteVideoContent('')} />}
          value={videoBuildBlock?.params?.url || ''}
          onChange={onChangeVideoContent}
          placeholder="Type to search here"
        />
        <ul>
          <li>
            Insert a link to a video from <Link to="https://www.youtube.com">Youtube</Link> or
            <Link to="https://vimeo.com">Vimeo</Link>
          </li>
        </ul>
      </Accordion>
      <Accordion icon={alternateTextIcon} title="Alternate text">
        Its really hot inside Jupiter! No one knows exactly how hot, but scientists think it could
        be about 43,000°F (24,000°C) near Jupiters center, or core.
      </Accordion>
    </div>
  );
};

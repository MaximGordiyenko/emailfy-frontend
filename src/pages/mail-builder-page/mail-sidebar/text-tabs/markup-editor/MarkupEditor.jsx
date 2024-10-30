import { useState, useContext, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toolbar } from './options';
import { Title } from '../../../../../components/interface/Title/Title';
import { LineHeightSlider } from '../../../../../components/sliders/LineHeightSlider';
import { WriteIconButton } from '../../../../../components/mail-block-icons/WriteIconButton';
import { SpellingIconButton } from '../../../../../components/mail-block-icons/SpellingIconButton';
import { ContinueIconButton } from '../../../../../components/mail-block-icons/ContinueIconButton';
import { ShortenIconButton } from '../../../../../components/mail-block-icons/ShortenIconButton';
import { ExpandIconButton } from '../../../../../components/mail-block-icons/ExpandIconButton';
import { EmojisIconButton } from '../../../../../components/mail-block-icons/EmojisIconButton';
import { ToneIconButton } from '../../../../../components/mail-block-icons/ToneIconButton';
import * as builderScript from '../../../builder-script/builderScript';
import './styles.css';
import { MailBuilderContext } from '../../../../../context/MailBuilderContext';

export const MarkupEditor = () => {
  const { mailEditorState, setMailEditorState, selectedMailEditorBlock, selectedBlockID } =
    useContext(MailBuilderContext);

  const [textEditorState, setTextEditorState] = useState(EditorState.createEmpty());
  const [lineHeight, setLineHeight] = useState(80);

  useEffect(() => {
    if (!('text' in selectedMailEditorBlock.params)) return;
    const Component = selectedMailEditorBlock.content;
    const staticMarkup = renderToStaticMarkup(
      <Component
        id={selectedMailEditorBlock.id}
        text={selectedMailEditorBlock.params.text}
        style={selectedMailEditorBlock.params.style}
        editorBlock={selectedMailEditorBlock}
      />,
    );

    const structureForContentState = convertFromHTML(staticMarkup);
    const structureForEditorState = ContentState.createFromBlockArray(structureForContentState, {});
    setTextEditorState(EditorState.createWithContent(structureForEditorState));
  }, [selectedMailEditorBlock.id]);

  return (
    <div className="contents-wrapper">
      <Title margin="0 0 5px 5px" color="--default-text-color">
        {selectedMailEditorBlock ? `${selectedMailEditorBlock?.title} text` : ''}
      </Title>
      <div className="top-toolbar-container">
        <WriteIconButton />
        <SpellingIconButton />
        <ContinueIconButton />
        <ShortenIconButton />
        <ExpandIconButton />
        <EmojisIconButton />
        <ToneIconButton />
      </div>
      <div className="editor-text-wrapper">
        <Editor
          editorState={textEditorState}
          wrapperClassName="editor-text-container"
          toolbarClassName="editor-text-toolbar"
          editorClassName="editor-text-workspace"
          placeholder={
            selectedMailEditorBlock ? `type your ${selectedMailEditorBlock.type} here` : ''
          }
          onContentStateChange={(newContentState) => {
            const draftedHTMLContent = draftToHtml(newContentState);
            setMailEditorState((prevState) =>
              builderScript.updateBlockById(prevState, selectedBlockID, 'text', draftedHTMLContent),
            );
          }}
          onEditorStateChange={setTextEditorState}
          toolbar={toolbar}
          spellCheck={true}
        />
      </div>
      <LineHeightSlider
        destination={mailEditorState}
        setDestination={setMailEditorState}
        destinationID={selectedBlockID}
        editorState={textEditorState}
        setEditorState={setTextEditorState}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        selectedData={selectedMailEditorBlock}
      />
    </div>
  );
};

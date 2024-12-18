import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Controller } from 'react-hook-form';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { toolbar } from '../../pages/mail-builder-page/mail-sidebar/text-tabs/markup-editor/options';
// import { updateField } from '../../store/campaignSlice';
import './styles.css';

export const TextEditor = ({ name, control, placeholder }) => {
  // const dispatch = useDispatch();

  // const { campaign_text } = useSelector((state) => state.campaign.data);
  const campaign_text = 'cool campaign';

  const [editor, setEditor] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (campaign_text) {
      const blocksFromHTML = convertFromHTML(campaign_text);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditor(newEditorState);
    }
  }, [campaign_text]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Editor
            {...field}
            editorState={editor}
            onEditorStateChange={(newEditorState) => {
              const convertedToState = convertToRaw(newEditorState?.getCurrentContent());
              const convertedToHtml = draftToHtml(convertedToState);
              // dispatch(updateField({ field: 'campaign_text', value: convertedToHtml }));
              setEditor(newEditorState);
            }}
            placeholder={placeholder}
            toolbar={toolbar}
            spellCheck={true}
            wrapperClassName="editor-container"
            toolbarClassName="editor-toolbar"
            editorClassName="editor-workspace"
          />
        )}
      />
    </>
  );
};

import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { toolbar } from '../../pages/mail-builder-page/mail-sidebar/text-tabs/markup-editor/options';

import { showRequiredLabel } from '../../helpers/ShowRequiredLabel.tsx';

import { Upload, Form, Flex } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.css';

const { Item } = Form;

export const TextEditor = ({ label, required, validateStatus, help, tooltip, name, control, placeholder }) => {
  const { watch, reset } = useFormContext();
  
  const htmlContent = watch('text');
  
  const [editor, setEditor] = useState(EditorState.createEmpty());
  
  // const { campaign_text } = useSelector((state) => state.campaign.data);
  /*useEffect(() => {
    if (campaign_text) {
      const blocksFromHTML = convertFromHTML(campaign_text);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditor(newEditorState);
    }
  }, [campaign_text]);*/
  
  const contentLabel = () => (
    <Flex justify="space-between">
      {showRequiredLabel(label, required)}
      {htmlContent &&
        <DeleteOutlined
          onClick={() => reset((formValues) => ({
            ...formValues,
            [name]: ''
          }))}
        />
      }
    </Flex>
  );
  
  return (
    <Item
      label={label && contentLabel()}
      validateStatus={validateStatus}
      help={help}
      tooltip={tooltip}
      layout="vertical">
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
    </Item>
  );
};

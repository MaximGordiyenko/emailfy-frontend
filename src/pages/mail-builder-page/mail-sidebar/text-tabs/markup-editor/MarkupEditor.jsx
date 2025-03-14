import { useState, useContext, useEffect } from 'react';
import { MailBuilderContext } from '../../../../../context/MailBuilderContext';
import { renderToStaticMarkup } from 'react-dom/server';

import { useMutation } from '@tanstack/react-query';
import { createAIQuestion } from '../../../../../api/builder/ai.js';

import { v4 as uuidv4 } from 'uuid';
import { Input, Modal, Typography, Select, Flex } from 'antd';

import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toolbar } from './options';

import { LineHeightSlider } from '../../../../../components/sliders/LineHeightSlider';
import { WriteIconButton } from '../../../../../components/mail-block-icons/WriteIconButton';
import { SpellingIconButton } from '../../../../../components/mail-block-icons/SpellingIconButton';
import { ContinueIconButton } from '../../../../../components/mail-block-icons/ContinueIconButton';
import { ShortenIconButton } from '../../../../../components/mail-block-icons/ShortenIconButton';
import { ExpandIconButton } from '../../../../../components/mail-block-icons/ExpandIconButton';
import { EmojisIconButton } from '../../../../../components/mail-block-icons/EmojisIconButton';
import { ToneIconButton } from '../../../../../components/mail-block-icons/ToneIconButton';
import { AppButton } from '../../../../../components/button/AppButton.jsx';
import { LoadingOutlined } from '@ant-design/icons';

import * as builderScript from '../../../builder-script/builderScript';
import { modelAIOptions } from '../../../../../app.constants.js';

import './styles.css';

const { Title } = Typography;
const { TextArea } = Input;

export const MarkupEditor = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [massageAI, setMassageAI] = useState("");
  const [model, setModel] = useState("");
  
  const { mailEditorState, setMailEditorState, selectedMailEditorBlock, selectedBlockID } =
    useContext(MailBuilderContext);
  
  const { mutate, data, isPending } = useMutation({
    mutationFn: (message, model) => createAIQuestion({ message, model }),
    onSuccess: () => {
      setIsOpenModal((prev) => !prev);
    },
    onError: () => {
    }
  });
  
  const handleSend = () => {
    if (massageAI.trim()) mutate({ message: massageAI, model });
    setMassageAI("");
  };
  
  const [textEditorState, setTextEditorState] = useState(EditorState.createEmpty());
  const [lineHeight, setLineHeight] = useState(80);
  
  useEffect(() => {
    if (!('text' in selectedMailEditorBlock.params)) return;
    const Component = selectedMailEditorBlock.content;
    const staticMarkup = renderToStaticMarkup(
      <Component
        id={selectedMailEditorBlock.id}
        text={data ? data : selectedMailEditorBlock.params.text}
        style={selectedMailEditorBlock.params.style}
        editorBlock={selectedMailEditorBlock}
      />
    );
    
    const structureForContentState = convertFromHTML(staticMarkup);
    const structureForEditorState = ContentState.createFromBlockArray(structureForContentState, {});
    setTextEditorState(EditorState.createWithContent(structureForEditorState));
  }, [selectedMailEditorBlock.id, data]);
  
  return (
    <div className="contents-wrapper">
      <Modal
        title={<Title level={4}>Ask AI</Title>}
        footer={[
          <Flex key={uuidv4()} justify="space-between">
            <Select
              defaultValue=""
              prefix="model:"
              size='large'
              style={{ width: 170 }}
              onChange={(value) => setModel(value)}
              options={modelAIOptions}
            />
            <AppButton
              label={'Send'}
              icon={isPending && <LoadingOutlined/>}
              onClick={handleSend}
              disabled={massageAI.length <= 4}
            />
          </Flex>
        ]}
        mask={true}
        maskClosable={true}
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal((prev) => !prev)}
        width={800}>
        <TextArea rows={4} value={massageAI} onChange={(e) => setMassageAI(e.target.value)}/>
      </Modal>
      
      <div className="top-toolbar-container">
        <WriteIconButton onClick={() => setIsOpenModal(true)}/>
        <SpellingIconButton/>
        <ContinueIconButton/>
        <ShortenIconButton/>
        <ExpandIconButton/>
        <EmojisIconButton/>
        <ToneIconButton/>
      </div>
      
      <div className="editor-text-wrapper">
        <Editor
          editorState={textEditorState}
          wrapperClassName="editor-text-container"
          toolbarClassName="editor-text-toolbar"
          editorClassName="editor-text-workspace"
          placeholder={
            selectedMailEditorBlock ? `Type your <${selectedMailEditorBlock.title}> here` : ''
          }
          onContentStateChange={(newContentState) => {
            const draftedHTMLContent = draftToHtml(newContentState);
            setMailEditorState((prevState) =>
              builderScript.updateBlockById(prevState, selectedBlockID, 'text', draftedHTMLContent)
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

import { useContext, useRef } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { BorderOverChild } from '../../../components/interface/BorderOverChild';
import { initMobileMediaQuery, initDesktopMediaQuery } from '../initial.constants';
import * as builderScript from '../builder-script/builderScript';
import * as builderTemplate from '../builder-script/builderTemplate';
import * as resourceManager from '../builder-script/resourceManager';
import { MailBuilderContext } from '../../../context/MailBuilderContext';
import './styles.css';

export const MailEditor = () => {
  const initialRef = useRef(null);

  const {
    mailEditorState,
    setMailEditorState,
    mediaQuery,
    showMailPreview,
    selectedBlockID,
    setSelectedBlockID,
  } = useContext(MailBuilderContext);

  const onDragOverStyles = (event) => {
    const splitterElement = event.currentTarget.querySelector('.on-drag-splitter');

    if (splitterElement) {
      splitterElement.classList.remove('on-drag-splitter');
    }

    if (event.target.classList.contains('drop-your-content-here')) {
      event.target.classList.add('highlight-layout-child');
    }
  };

  const onDragLeaveStyles = (event) => event.target.classList.remove('highlight-layout-child');

  const onDropStyles = (event) => event.target.classList.remove('highlight-layout-child');

  const onDragOverHideInitBlock = () =>
    initialRef.current ? (initialRef.current.style.display = 'none') : null;

  const isPreviewMode = !showMailPreview ? ' is-editor-mode' : '';
  const isPreviewDesktopMode =
    showMailPreview && mediaQuery === initDesktopMediaQuery
      ? ' is-preview-mode is-desktop-mode'
      : '';
  const isPreviewMobileMode =
    showMailPreview && mediaQuery === initMobileMediaQuery ? ' is-preview-mode is-mobile-mode' : '';

  return (
    <ReactSortable
      list={mailEditorState}
      setList={setMailEditorState}
      group={{
        name: 'editor-list',
        pull: true,
        put: ['layout-list', 'orthography-list'],
      }}
      animation={200}
      clone={(item) => builderScript.cloneBlock(item)}
      className={`mail-editor${isPreviewMode}${isPreviewDesktopMode}${isPreviewMobileMode}`}>
      {mailEditorState?.length ? (
        mailEditorState?.map((editorBlock) => {
          const Component = builderScript.initBlock(editorBlock).content;
          return (
            <div
              key={editorBlock.id}
              onDragOverCapture={onDragOverStyles}
              onDragLeaveCapture={onDragLeaveStyles}
              onDrop={onDropStyles}
              onClick={() => {
                !showMailPreview && setSelectedBlockID(editorBlock.id);
              }}
              className={`editor-block`}>
              <Component
                {...editorBlock}
                id={editorBlock.id}
                text={editorBlock.params.text}
                style={editorBlock.params.style}
                editorBlock={editorBlock}
                params={editorBlock.params}
                onClick={() => {
                  !showMailPreview && setSelectedBlockID(editorBlock.id);
                }}
                isActive={editorBlock.id === selectedBlockID}
                showMailPreview={showMailPreview}
                mode={'editor'}
              />
              {!showMailPreview && (
                <BorderOverChild
                  editorBlock={editorBlock}
                  handleDuplicate={(id) => {
                    setMailEditorState((prevState) =>
                      builderScript.duplicateBlockById(prevState, id),
                    );
                  }}
                  handleDelete={async (id) => {
                    setMailEditorState((prevState) => {
                      const state = builderScript.removeBlockById(prevState, id);
                      builderTemplate.saveScript(state);
                      return state;
                    });
                    if (editorBlock.params.resource_id) {
                      await resourceManager.removeResource(editorBlock.params.resource_id);
                    }
                  }}
                />
              )}
            </div>
          );
        })
      ) : (
        <div
          ref={initialRef}
          className="initial-editor-placeholder"
          onDragOver={onDragOverHideInitBlock}>
          <h6 className="placeholder-top-text">Start building your project:</h6>
          <h4 className="placeholder-bottom-text">Drop a paragraph here</h4>
        </div>
      )}
    </ReactSortable>
  );
};

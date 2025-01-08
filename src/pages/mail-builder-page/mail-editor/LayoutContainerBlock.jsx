import { useContext, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { initMobileMediaQuery } from '../initial.constants.js';
import './styles.css';
import * as builderScript from '../builder-script/builderScript.js';
import * as builderTemplate from '../builder-script/builderTemplate.js';
import * as resourceManager from '../builder-script/resourceManager.js';
import { MailBuilderContext } from '../../../context/MailBuilderContext.jsx';

const LayoutChildBlock = ({ editorBlock, childBlock, childIdx }) => {
  const [grandChildID, setGrandChildID] = useState('');
  const {
    setMailEditorState,
    mailEditorState,
    selectedBlockID,
    setSelectedBlockID,
    activeTab,
    showMailPreview,
    mediaQuery,
  } = useContext(MailBuilderContext);

  const isDropContentHere = childBlock.children.length
    ? ''
    : !showMailPreview
      ? ' drop-your-content-here'
      : '';
  const isActiveLayoutTab = activeTab === ' layout-blocks-tab' ? ' layout-tab-active' : '';
  const isActiveDragIcon =
    !showMailPreview && grandChildID === selectedBlockID ? ' is-active-icon-drag' : '';

  const isPreviewMobileMode =
    showMailPreview && mediaQuery === initMobileMediaQuery ? ' is-layout-child-mobile-mode' : '';

  const isPreviewWidth =
    showMailPreview && mediaQuery === initMobileMediaQuery ? '100%' : editorBlock?.width[childIdx];

  return (
    <ReactSortable
      list={childBlock.children}
      setList={(updatedState) =>
        setMailEditorState((prevState) =>
          builderScript.updateBlockById(prevState, childBlock.id, null, updatedState),
        )
      }
      key={childBlock.id}
      id={childBlock.id}
      group={{
        name: 'layout-child',
        put: ['orthography-list'],
      }}
      animation={200}
      clone={(item) => builderScript.cloneBlock(item)}
      style={{ width: isPreviewWidth }}
      className={`layout-child${isDropContentHere}${isActiveLayoutTab}${isActiveDragIcon}${isPreviewMobileMode}`}>
      {childBlock.children.map((ch) => {
        const Component = builderScript.initBlock(ch).content;
        return (
          <Component
            {...ch}
            key={ch.id}
            id={ch.id}
            text={ch.params.text}
            style={ch.params.style}
            editorBlock={ch}
            params={ch.params}
            isActive={ch.id === selectedBlockID}
            showMailPreview={showMailPreview}
            onClickRemoveBuildBlock={async () => {
              setMailEditorState((prevState) => {
                const state = builderScript.removeBlockById(prevState, ch.id);
                builderTemplate.saveScript(state);
                return state;
              });
              if (ch.params.resource_id) {
                await resourceManager.removeResource(ch.params.resource_id);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!showMailPreview) {
                setSelectedBlockID(ch.id);
                setGrandChildID(ch.id);
              }
            }}
          />
        );
      })}
    </ReactSortable>
  );
};

export const LayoutContainerBlock = ({ editorBlock }) => {
  const { showMailPreview, mediaQuery } = useContext(MailBuilderContext);

  const isPreviewMobileMode =
    showMailPreview && mediaQuery === initMobileMediaQuery
      ? ' is-layout-container-mobile-mode'
      : '';

  return (
    <ReactSortable
      list={editorBlock?.params.child}
      setList={() => {}}
      group={{
        name: 'layout-container',
        pull: true,
      }}
      clone={(item) => builderScript.cloneBlock(item)}
      animation={200}
      className={`layout-container${isPreviewMobileMode}`}>
      {editorBlock?.params.child.map((childBlock, childIdx) => (
        <LayoutChildBlock
          key={childBlock.id}
          editorBlock={editorBlock}
          childBlock={childBlock}
          childIdx={childIdx}
        />
      ))}
    </ReactSortable>
  );
};

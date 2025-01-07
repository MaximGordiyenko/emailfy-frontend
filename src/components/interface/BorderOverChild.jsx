import { useContext } from 'react';
import { StickyIcon } from '../icons/StickyIcon';
import { DuplicateIcon } from '../icons/DuplicateIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { DragIcon } from '../icons/DragIcon';
import { MailBuilderContext } from '../../context/MailBuilderContext';

export const BorderOverChild = ({ editorBlock, handleDuplicate, handleDelete }) => {
  const { selectedBlockID, activeTab, workspaceWidth } = useContext(MailBuilderContext);

  const activeBorderOverBlock =
    editorBlock.id === selectedBlockID || activeTab === 'layout-blocks-tab'
      ? ' is-active-border'
      : '';

  return (
    <div
      className={`border-over-child${activeBorderOverBlock}`}
      style={{
        left: `calc((100% + 10px - ${workspaceWidth}px) / 2)`,
        width: `calc(100% - 5px + (${workspaceWidth}px - 100%))`,
      }}>
      <StickyIcon
        id={editorBlock.id}
        isActive={editorBlock.id === selectedBlockID}
        onClick={() => handleDuplicate(selectedBlockID)}
        Icon={DuplicateIcon}
      />
      <StickyIcon
        id={editorBlock.id}
        isActive={editorBlock.id === selectedBlockID}
        onClick={() => handleDelete(selectedBlockID)}
        Icon={DeleteIcon}
      />
      <StickyIcon
        id={editorBlock.id}
        isActive={editorBlock.id === selectedBlockID}
        Icon={DragIcon}
      />
    </div>
  );
};

export const findSelectedEditorBlockById = (mailEditorState, selectedID) => {
  for (let block of mailEditorState) {
    if (block.id === selectedID) {
      return block;
    }
    if (block.type?.startsWith('layout')) {
      for (let i = 0; i < block.params.child.length; i++) {
        if (block.params.child[i].children.length) {
          const childBlock = findSelectedEditorBlockById(
            block.params.child[i].children,
            selectedID,
          );
          if (childBlock) {
            return childBlock;
          }
        }
      }
    } else if ('child' in block.params) {
      const childBlock = findSelectedEditorBlockById(block.params.child, selectedID);
      if (childBlock) {
        return childBlock;
      }
    }
  }
  return null;
};

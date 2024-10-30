/**
 * Finds a video build block in the given mail editor state by its ID.
 * @param {Array} mailEditorState - The array representing the mail editor state.
 * @param {string} videoBuildBlockId - The ID of the video build block to find.
 * @returns {Array} - An array containing the found video build block(s).
 */
export const findVideoBuildBlockByID = (mailEditorState, videoBuildBlockId) => {
  return mailEditorState.reduce((acc, el) => {
    if (el.id === videoBuildBlockId) {
      acc.push(el);
    } else if (el.child) {
      el.child.forEach((i) => {
        if (i.children) {
          acc.push(...i.children.filter((ch) => ch.id === videoBuildBlockId));
        }
      });
    }
    return acc;
  }, []);
};

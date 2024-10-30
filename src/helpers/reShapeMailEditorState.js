/**
 * Restructures an array of objects by wrapping properties text, style, url in the params object in order to send it
 * to server for searching it in DB.
 * @param state - The array of objects to be restructured.
 * @returns {Array<Object>} - The restructured array of objects.
 */
export const reShapeMailEditorState = (state) => {
  return state.map((obj) => {
    const reshapedObj = {};
    ['id', 'type'].forEach((prop) => {
      if (obj.hasOwnProperty(prop)) {
        reshapedObj[prop] = obj[prop];
      }
    });
    if (obj.hasOwnProperty('text') || obj.hasOwnProperty('url') || obj.hasOwnProperty('style')) {
      reshapedObj.params = {};
      if (obj.hasOwnProperty('text')) {
        reshapedObj.params['text'] = obj['text'];
      }
      if (obj.hasOwnProperty('url')) {
        reshapedObj.params['url'] = obj['url'];
      }
      if (obj.hasOwnProperty('style')) {
        reshapedObj.params['style'] = obj['style'];
      }
    }
    if (obj.hasOwnProperty('child')) {
      reshapedObj.params = reshapedObj.params || {};
      reshapedObj.params['child'] = reShapeMailEditorState(obj['child']);
    }
    if (obj.hasOwnProperty('children')) {
      reshapedObj['children'] = reShapeMailEditorState(obj['children']);
    }
    return reshapedObj;
  });
};

/**
 * Updates the URL of a block element recursively within the editor state.
 * @param {function} setState - Function to set the updated editor state.
 * @param {string} value - The new URL value to set.
 * @param {string} id - The ID of the block element to update.
 * @param {string} key - The key in the block element where the URL should be updated.
 * Recursively updates the URL of the block element.
 * @param {object} value - The current element being processed.
 * @returns {object} The updated element.
 */
export const setBuildBlockPropsByKey = (setState, key, value, id) => {
  const updateUrlRecursive = (element) => {
    if (element.id === id) {
      return {
        ...element,
        params: {
          ...element.params,
          [key]: value,
        },
      };
    }

    if (element.type?.startsWith('layout')) {
      return {
        ...element,
        params: {
          ...element.params,
          child: element.params.child.map((child) => {
            return {
              ...child,
              children: child.children.map(updateUrlRecursive),
            };
          }),
        },
      };
    } else if ('child' in element.params) {
      return {
        ...element,
        params: {
          ...element.params,
          child: element.params.child.map(updateUrlRecursive),
        },
      };
    }

    return element;
  };

  setState((prevState) => prevState.map(updateUrlRecursive));
};

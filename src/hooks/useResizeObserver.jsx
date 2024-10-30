import { useEffect } from 'react';

/**
 * useResizeObserver - A custom React hook using ResizeObserver API to monitor changes in the width of a specified HTML element.
 * @param {HTMLElement} element - The HTML element to be observed for size changes.
 * @param {function} callback - The callback function to be executed when the element's width changes.
 * @returns {void} - Returns nothing.
 */
export const useResizeObserver = (element, callback) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        callback(entry.contentRect.width);
      }
    });

    if (element) {
      resizeObserver.observe(element);

      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, [element, callback]);
};

export const extractIDFromVimeoUrl = (url) => {
  // Regular expression to match the number part of the Vimeo URL
  let regex = /vimeo\.com\/(\d+)/;

  // Use match to find the number in the URL
  let match = url.match(regex);

  // If match is found, return the number, else return null
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

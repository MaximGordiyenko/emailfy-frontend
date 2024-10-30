import italic from './editor-icons/italic.svg';
import strikethrough from './editor-icons/strikethrough.svg';
import underline from './editor-icons/underline.svg';
import bold from './editor-icons/bold.svg';
import alignLeft from './editor-icons/alignLeft.svg';
import alignCenter from './editor-icons/alignCenter.svg';
import alignRight from './editor-icons/alignRight.svg';
import link from './editor-icons/link.svg';
import unlink from './editor-icons/unlink.svg';

export const toolbar = {
  options: ['fontFamily', 'fontSize', 'inline', 'link', 'colorPicker', 'textAlign'],
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: 'font-family-container',
    dropdownClassName: 'font-family-dropdown',
  },
  fontSize: {
    className: 'font-size-container',
    dropdownClassName: 'font-size-dropdown',
  },
  inline: {
    className: 'inline-container',
    inDropdown: false,
    options: ['italic', 'strikethrough', 'underline', 'bold'],
    italic: { icon: italic, className: 'italic' },
    strikethrough: { icon: strikethrough, className: 'strikethrough' },
    underline: { icon: underline, className: 'underline' },
    bold: { icon: bold, className: 'bold' },
  },
  link: {
    className: 'link-container',
    options: ['link', 'unlink'],
    popupClassName: 'link-popup',
    showOpenOptionOnHover: false,
    defaultTargetOption: '_self',
    link: { icon: link, className: 'link-item' },
    unlink: { icon: unlink, className: 'link-item' },
  },
  colorPicker: {
    className: 'color-picker-container',
    popupClassName: 'color-picker-modal',
  },
  textAlign: {
    className: 'text-align-container',
    options: ['left', 'center', 'right'],
    left: { icon: alignLeft, className: 'align-icon left' },
    center: { icon: alignCenter, className: 'align-icon center' },
    right: { icon: alignRight, className: 'align-icon right' },
  },
};

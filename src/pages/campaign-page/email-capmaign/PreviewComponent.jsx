export const PreviewComponent = ({ renderedData, desktopMode, mobileMode }) => {
  return (
    <iframe
      className={`editor-preview-container${desktopMode}${mobileMode}`}
      srcDoc={renderedData}
      id="campaign_modal"
      title="campaign view html in modal"
      style={{ border: 'none' }}
    />
  );
};

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { useDispatch, useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import uploadIcon from '../../assets/images/uploadHtmlIcon.png';
// import { updateField } from '../../store/campaignSlice';
import { initAnalytics } from '../../pages/mail-builder-page/builder-script/analyticsUtil';
import { saveContent } from '../../pages/mail-builder-page/builder-script/builderTemplate';
import './styles.css';

export const BrandUploader = () => {
  const [progress, setProgress] = useState(0);
  const { control } = useFormContext();
  // const dispatch = useDispatch();

  // const { html } = useSelector((state) => state.campaign.data);
  const html = 'html';

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        setProgress(percentLoaded);
      }
    };

    reader.onload = async (event) => {
      const fileContent = event.target.result;
      const htmlAnalytics = await initAnalytics(fileContent);
      await saveContent({
        content: htmlAnalytics,
      });
      // dispatch(updateField({ field: 'html', value: fileContent }));
    };

    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, open, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html', '.htm'],
    },
  });

  const isDrag = isDragAccept ? ' is-drag-accept' : '';
  const isReject = isDragReject ? ' is-drag-reject' : '';

  const handleSelectClick = (e) => {
    e.stopPropagation();
    open();
  };

  return (
    <Controller
      control={control}
      name="html"
      defaultValue=""
      render={({ field }) => (
        <div className={`drop-zone-wrapper ${isDrag} ${isReject}`}>
          {!html ? (
            <div {...getRootProps()} className={`drop-zone`} {...field}>
              <input {...getInputProps({ className: 'dropzone-input' })} />
              <div className="dropzone-container">
                <img src={uploadIcon} alt="uploadIcon" />
                <span className="dropzone-placeholder-abbr">.HTML</span>
                <span className="dropzone-placeholder-text">
                  You can drag and drop the file or{' '}
                  <span className="dropzone-placeholder-link" onClick={handleSelectClick}>
                    Browse
                  </span>
                </span>
              </div>
              {progress.length > 0 && (
                <div className={`progress-bar`}>
                  <div
                    style={{
                      width: `${progress}%`,
                      backgroundColor: progress === 100 ? '#EDB833' : '#95959D',
                    }}
                  />
                  {progress > 0 && progress < 100 && (
                    <p className="progress-bar-text">{progress}%</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <iframe
              srcDoc={html}
              id="campaign_uploader"
              title="campaign view html in uploader"
              style={{ minHeight: `37vh`, border: 'none', width: '86%' }}
            />
          )}
        </div>
      )}
    />
  );
};

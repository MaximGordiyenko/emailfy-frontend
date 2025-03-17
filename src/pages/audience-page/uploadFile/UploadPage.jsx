import DropFile from './Dropzone.jsx';
import './styles.css';

export const UploadPage = () => {

  return (
    <div className="upload-wrapper">
      <div className="inner-content">
        <div className="count-upload">
          <div className="title-count">
            <p>Upload file</p>
          </div>
        </div>
        <div className="uploader-box">
          <div className="uploader">{<DropFile />}</div>
        </div>
      </div>
    </div>
  );
};

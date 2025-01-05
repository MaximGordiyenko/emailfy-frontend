import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/progress-bars/ProgressBar';
import DropFile from './Dropzone';
import './styles.css';
import { ROUTE } from '../../../routes/routes.constants';

// import { useSelector } from 'react-redux';

export const UploadPage = () => {
  // const isFileUploaded = useSelector((state) => state.file.isFileUploaded);

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

import { useParams, useNavigate } from 'react-router-dom';
import './style.scss';
import audience from '../../../../assets/images/audience/audienceicon.png';
import ProgressBar from '../../../../components/progressBar/ProgressBar';
import DropFile from './Dropzone';

import { useSelector } from 'react-redux';
import BrandHeader from '../../../../components/header/BrandHeader';

export const UploadPage = () => {
  const isFileUploaded = useSelector((state) => state.file.isFileUploaded);
  let { id } = useParams();
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/audience/segmentation', { replace: true });
  };

  const handleNavBack = () => {
    navigate('/audience/', { replace: true });
  };

  const headerContent = () => {
    return (
      <>
        <div className={'btns'}>
          <button className={'filled'} disabled={!isFileUploaded} onClick={handleNav}>
            <span>Next</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="upload-wrapper" id={id}>
      <BrandHeader
        icon={audience}
        description={'Audience'}
        params={' Add contacts via file'}
        content={headerContent()}
      />
      <div className="pg-bars">
        <div className="progress-bar-upload">
          <ProgressBar bgcolor="#7E9D00" completed={50} className="progress-bar" />
        </div>
      </div>
      <div className="inner-content">
        <div className="count-upload">
          <div className="title-count">
            <span>{isFileUploaded ? 1 : 0}/2</span>
            <p>Upload file</p>
          </div>
        </div>
        <div className="uploader-box">
          <div className="uploader">
            <DropFile />
          </div>
        </div>
      </div>
    </div>
  );
};

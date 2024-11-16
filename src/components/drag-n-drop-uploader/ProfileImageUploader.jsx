import { useDropzone } from 'react-dropzone';
import { ProfileImageViewer } from '../viewers/ProfileImageViewer';
import uploadIcon from '../../assets/images/uploadIcon.png';

export const ProfileImageUploader = ({ profileImage, isLoadingProfileImage, uploadImage }) => {
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);
    uploadImage(formData);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    noDrag: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
      </div>
      {profileImage?.AWSImageUrl ? (
        <ProfileImageViewer profileImage={profileImage} isLoading={isLoadingProfileImage} />
      ) : (
        <img src={uploadIcon} alt="uploadIcon" />
      )}
      <button type="button" onClick={open}>
        Open File
      </button>
    </div>
  );
};

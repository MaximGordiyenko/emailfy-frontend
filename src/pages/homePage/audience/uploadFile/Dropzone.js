import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import dropzoneBg from '../../../../assets/images/upload_html_bg.svg';
import cloud from '../../../../assets/images/Upload icon 2.svg';
import cloudUpload from '../../../../assets/images/Upload icon.svg';
import deleteFile from '../../../../assets/images/xblack.png';
import './style.scss';
import { useDispatch } from 'react-redux';
import { clearUploadedFile, setUploadedFile } from '../../../../store/fileSlice';

function DropFile() {
  const [myFile, setMyFile] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      (async () => {
        const file = acceptedFiles[0];
        const content = await file.text();
        setMyFile({ name: file.name, type: file.type, size: file.size });
        dispatch(
          setUploadedFile({ name: file.name, type: file.type, size: file.size, data: content }),
        );
      })();
    },
  });

  const truncateFileName = (fileName, maxLength = 15) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    return fileName.substring(0, maxLength) + '...';
  };

  const handleRemove = () => {
    setIsOpenModal(false);
    setMyFile(null);
    dispatch(clearUploadedFile());
  };

  return (
    <section className={'container'}>
      <div className={isOpenModal ? 'modal-upload' : 'modal-hide'}>
        <div className="modal-window">
          <h1>Are you sure you want to delete this file</h1>
          <span>This file will be deleted irretrievably</span>
          <div className="btns">
            <button
              onClick={() => {
                setIsOpenModal(false);
              }}
              className="bnt1">
              <span>Continue</span>
            </button>
            <button className="bnt2" onClick={handleRemove}>
              <span>Yes, delete</span>
            </button>
          </div>
        </div>
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <img src={myFile ? cloud : cloudUpload} alt={'cloud'} />
        <div className={!myFile ? 'options' : 'options-hide'}>
          <span>.CSV .TXT</span>
          <p>
            You can drag and drop the file or <a>Browse</a>
          </p>
        </div>
      </div>
      <aside>
        <div className={myFile ? 'item-name' : 'item-hide'}>
          <div>
            {myFile && (
              <button>
                <span>{truncateFileName(myFile.name)}</span>
                <img src={deleteFile} alt={'x'} onClick={handleRemove} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
}

export default DropFile;

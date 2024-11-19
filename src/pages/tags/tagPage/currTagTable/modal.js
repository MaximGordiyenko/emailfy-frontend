import React from 'react';
import './style.scss';

function Modal({ isOpen, closeModal }) {
  const modalClassName = `modal ${isOpen ? 'open' : ''}`;
  return (
    <div className={modalClassName}>
      <div className={'modal-content'}>
        <p>Are you sure you want to delete contacts from this tag?</p>
        <div className={'btn-box'}>
          <button onClick={closeModal} className={'cancel-btn'}>
            <div>Cancel</div>
          </button>
          <button className={'delete-btn'}>
            <div>Delete</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

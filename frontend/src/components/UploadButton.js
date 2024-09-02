import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function UploadButton() {
  return (
    <div className="upload-container">
      <label htmlFor="fileUpload" className="upload-button">
        <div>
          <FontAwesomeIcon icon={faCamera} className="file-icon" />
          <span>사진 등록</span>
        </div>
        <input type="file" accept="image/*" multiple id="fileUpload" />
        <p id="setup-file">최대 5장</p>
      </label>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

// 업로드 버튼 컴포넌트
export default function UploadButton({
  register = () => {},
  defaultValue = {},
}) {
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
    if (defaultValue.length > 0) {
      const defaultImageUrls = defaultValue.map(
        (item) =>
          'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/' +
          item.imgName,
      );
      setPreviewImages(defaultImageUrls);
    }
  }, [defaultValue]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewImages = [];

    if (files.length > 5) {
      alert('최대 5장까지만 업로드할 수 있습니다.');
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewImages.push(e.target.result);
        if (newPreviewImages.length === files.length) {
          setPreviewImages(newPreviewImages);
        }
      };
      reader.readAsDataURL(file);
    });

    // FormData에 파일 추가
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('imgName', file);
    });
  };

  return (
    <div className="upload-container">
      <label htmlFor="fileUpload" className="upload-button">
        <div>
          <FontAwesomeIcon icon={faCamera} className="file-icon" />
          <span>사진 등록</span>
        </div>
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          multiple
          id="fileUpload"
          {...register('imgName')}
          onChange={handleFileChange}
        />
        <p id="setup-file">최대 5장</p>
      </label>
      <div className="image-preview-container">
        {previewImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            className="image-preview"
          />
        ))}
      </div>
    </div>
  );
}

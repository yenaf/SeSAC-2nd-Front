import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/SellerPage.scss';
import '../styles/pages/MyPage.scss';

export default function SellersPage() {
  const [previewImg, setPreviewImg] = useState('/img/duck.jpg'); // default 이미지 설정
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log('Form Data: ', data);

    alert('판매자 등록이 완료되었습니다!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);

      // 파일 이름을 저장
      // setValue('sellerImg', file.name);
    }
  };
  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container">
          <div className="seller-container">
            <div className="seller-title">
              <h2>판매자 정보 등록</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id="seller">
              <div className="seller-input">
                <label htmlFor="sellerName">판매자명</label>
                <input
                  type="text"
                  id="sellerName"
                  {...register('sellerName', {
                    required: '판매자명을 입력해주세요.',
                    pattern: {
                      message:
                        '판매자명은 2~15자 이내의 한글, 영어, 숫자, 특수문자만 가능합니다.',
                      value: /^[a-zA-Z0-9가-힣*!]{2,15}$/,
                    },
                  })}
                />
                {errors.sellerName && (
                  <span className="err-msg">{errors.sellerName.message}</span>
                )}

                <div className="seller-img">
                  <label htmlFor="sellerImg">프로필 사진</label>
                  <img src={previewImg} alt="profile-img" id="sellerImg" />
                </div>
                <input
                  type="file"
                  className="file-box"
                  id="sellerImgInput"
                  {...register('sellerImg', {
                    // required: '프로필 사진을 업로드해주세요.',
                  })}
                  onChange={handleImageChange}
                />
                {errors.sellerImg && (
                  <span className="err-msg">{errors.sellerImg.message}</span>
                )}

                <label htmlFor="sellerExplain">판매자 설명</label>
                <input
                  type="text"
                  id="sellerExplain"
                  {...register('sellerExplain', {
                    required: '판매자 설명을 입력해주세요.',
                  })}
                />
                {errors.sellerExplain && (
                  <span className="err-msg">
                    {errors.sellerExplain.message}
                  </span>
                )}

                <div className="drive">
                  <label htmlFor="">배송사 선택</label>
                  <div className="drive-choose">
                    <input
                      type="radio"
                      name="deliveryName"
                      id="postChecked"
                      value="우체국"
                      {...register('deliveryName', {
                        required: '배송사를 선택해주세요.',
                      })}
                    />
                    <label htmlFor="postChecked">우체국</label>
                    <input
                      type="radio"
                      name="deliveryName"
                      id="koChecked"
                      value="대한통운"
                      {...register('deliveryName', {
                        required: '배송사를 선택해주세요.',
                      })}
                    />
                    <label htmlFor="koChecked">대한통운</label>
                  </div>
                  {errors.deliveryName && (
                    <span className="err-msg">배송사를 선택해주세요.</span>
                  )}
                </div>

                <div className="seller-btn">
                  <button type="submit">등록</button>
                  <button type="button">취소</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

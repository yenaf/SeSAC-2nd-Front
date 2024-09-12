import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';
import { UserContext } from '../hooks/useAuth';
import { postSellerData } from '../api/seller';

export default function SellersPage() {
  const [previewImg, setPreviewImg] = useState('/img/duck.jpg'); // default 이미지 설정
  const [initialData, setInitialData] = useState(null); // 초기 데이터 저장
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const { sellerRegister } = useContext(UserContext);

  // 파일 체크 함수
  const fileExtCheck = (obj) => {
    const pathPoint = obj.lastIndexOf('.');
    const filePoint = obj.substring(pathPoint + 1, obj.length);
    const fileType = filePoint.toLowerCase();
    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png')
      return true;
    else return false;
  };

  // 파일 체크
  const fileCheck = (e) => {
    let file = e.target.files[0];
    let fileName = file.name;

    if (fileExtCheck(fileName)) {
      // 프사 설정한 대로 바꾸게 하기
      if (file) {
        let reader = new FileReader();
        reader.onload = () => {
          setPreviewImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert('이미지 파일만 올려주세요!');
      e.target.value = '';
    }
  };

  // API
  const onSubmitApi = async (data) => {
    const formData = new FormData();
    formData.append('sellerImg', data.sellerImg[0]);
    formData.append('sellerName', data.sellerName);
    formData.append('sellerExplain', data.sellerExplain);
    formData.append('deliveryId', data.deliveryId);

    // FormData 내용 로깅
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const res = await postSellerData(formData);

      if (res.status === 200) {
        alert('판매자 정보 등록이 완료되었습니다!');
        sellerRegister(res.data.seller);
      } else {
        alert('판매자 정보 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('판매자 등록 오류:', error);
      alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 취소 버튼 클릭 시 폼 초기화
  const handleReset = () => {
    reset();
    setPreviewImg('/img/duck.jpg'); // 기본 이미지로 다시 설정
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
            <form
              onSubmit={handleSubmit(onSubmitApi)}
              id="seller"
              encType="multipart/form-data"
            >
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

                <div>
                  <label htmlFor="sellerImg">프로필 사진</label>
                  <div className="seller-img">
                    <img src={previewImg} alt="profile-img" id="sellerImg" />
                  </div>
                </div>
                <input
                  type="file"
                  className="file-box"
                  id="sellerImgInput"
                  name="sellerImg"
                  {...register('sellerImg', {
                    // required: '프로필 사진을 업로드해주세요.',
                  })}
                  onChange={fileCheck}
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
                      name="deliveryId"
                      id="postChecked"
                      value="1"
                      {...register('deliveryId', {
                        required: '배송사를 선택해주세요.',
                      })}
                    />
                    <label htmlFor="postChecked">우체국</label>
                    <input
                      type="radio"
                      name="deliveryId"
                      id="koChecked"
                      value="2"
                      {...register('deliveryId', {
                        required: '배송사를 선택해주세요.',
                      })}
                    />
                    <label htmlFor="koChecked">대한통운</label>
                  </div>
                  {errors.deliveryId && (
                    <span className="err-msg">배송사를 선택해주세요.</span>
                  )}
                </div>

                <div className="seller-btn">
                  <button type="submit">등록</button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="reset-btn"
                  >
                    취소
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

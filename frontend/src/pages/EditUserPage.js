import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';
import React, { useEffect, useState } from 'react';
import '../styles/pages/Register.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AddressInput } from '../components/Register';
import { getEditUserInfoPageDate } from '../api/mypage';
import { checkNickAtServer, updateUserInfo } from '../api/user';

export default function EditUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      loginId: '',
      userPw: '',
      passwordCheck: '',
      userName: '',
      nickname: '',
      phoneNum: '',
      email: '',
      zipCode: '',
      address: '',
      detailedAddress: '',
    },
  });
  const [defaultAddress, setDefaultAddress] = useState({});
  const [previewImg, setPreviewImg] = useState(''); // default 이미지 설정

  useEffect(() => {
    const fetchInitData = async () => {
      getEditUserInfoPageDate().then((res) => {
        setValue('loginId', res.data.user.loginId);
        setPreviewImg(res.data.user.profileImg || '/img/duck.jpg');
        setValue('userName', res.data.user.userName);
        setValue('nickname', res.data.user.nickname);
        setValue('phoneNum', res.data.user.phoneNum);
        setValue('email', res.data.user.email);
        setDefaultAddress(res.data.address);
      });
    };

    fetchInitData();
  }, []);

  const navigate = useNavigate();

  // 닉네임 중복 체크
  const checkNickname = async (nickname) => {
    try {
      const res = checkNickAtServer(nickname);
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('nickname', {
          type: 'manual',
          message: error.response.data.message || '중복된 닉네임 입니다.',
        });
      } else {
        setError('nickname', {
          type: 'manual',
          message: error.response?.data?.message,
        });
      }
      return false;
    }
  };
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

  // 회원정보 수정
  const onValidApi = async (data) => {
    try {
      let userId;
      const userString = window.sessionStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        userId = user.userId;
      } else {
        console.log('세션스토리지에 접근하는 중 오류가 발생했습니다.');
      }
      // FormData 객체 생성
      const formData = new FormData();

      // 기본 사용자 정보 추가
      formData.append('loginId', data.loginId);
      formData.append('userPw', data.userPw);
      formData.append('userName', data.userName);
      formData.append('nickname', data.nickname);
      formData.append('phoneNum', data.phoneNum);
      formData.append('email', data.email);

      // 주소 정보 추가
      formData.append('zipCode', data.zipCode);
      formData.append('address', data.address);
      formData.append('detailedAddress', data.detailedAddress);

      if (data.sellerImg && data.sellerImg[0]) {
        formData.append('sellerImg', data.sellerImg[0]);
      }

      const res = await updateUserInfo(userId, formData);

      // 응답 확인
      if (res.status === 200) {
        alert('회원정보 수정이 완료되었습니다!');
        navigate('/mypage');
      } else {
        alert('회원정보 수정이 실패했습니다. 다시 시도해주세요.');
      }
      // 응답 확인
      if (res.data.msg.length !== '') {
        alert('회원정보 수정이 완료되었습니다!' + res.data.msg);
        navigate('/mypage');
      } else {
        alert('회원정보 수정이 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원정보 수정 오류:', error);
      console.log('error.response: ', error.response);

      if (error.response && error.response.status === 409) {
        // 백엔드에서 error 보냄
        const errorMessage = error.response.data?.error;

        if (errorMessage) {
          // 전화번호 중복 오류 처리
          if (errorMessage.includes('전화번호')) {
            setError('phoneNum', {
              type: 'manual',
              message: errorMessage || '이미 사용 중인 전화번호입니다.',
            });
          }
          // 이메일 중복 오류 처리
          else if (errorMessage.includes('이메일')) {
            setError('email', {
              type: 'manual',
              message: errorMessage || '이미 사용 중인 이메일입니다.',
            });
          }
        } else {
          console.log('서버에 에러메세지 없음');
          alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else {
        alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
      }
      return false;
    }
  };

  const onInValid = (err) => {
    console.log('onInValid >> ', err);
  };

  if (!defaultAddress) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container">
          <div className="edit-container">
            <div>
              <h2 className="register-title">개인 정보 수정</h2>
              <section className="register-container">
                <form
                  action="#"
                  id="register"
                  onSubmit={handleSubmit(onValidApi, onInValid)}
                >
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
                  <div className="register-input">
                    <label htmlFor="loginId">아이디</label>
                    <input
                      type="text"
                      id="loginId"
                      readOnly
                      {...register('loginId', {
                        required: '아이디를 입력해주세요!',
                        pattern: {
                          message:
                            '아이디는 영어, 소문자, 숫자로 6-12 자 사이여야 합니다.',
                          value: /^[a-z0-9]{6,12}$/,
                        },
                      })}
                    />
                    <span className="error-msg">{errors.loginId?.message}</span>
                  </div>

                  <div className="register-input">
                    <label htmlFor="userPw">비밀번호</label>
                    <input
                      type="password"
                      id="userPw"
                      {...register('userPw', {
                        required: '비밀번호를 입력해주세요!',
                        pattern: {
                          message:
                            '비밀번호는 영어와 숫자를 포함하고 8-16자 사이여야 합니다.',
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/,
                        },
                      })}
                    />
                    <span className="error-msg">{errors.userPw?.message}</span>
                  </div>

                  <div className="register-input">
                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                    <input
                      type="password"
                      id="passwordCheck"
                      {...register('passwordCheck', {
                        required: '비밀번호를 확인해주세요!',
                        validate: (value) =>
                          value === watch('userPw') ||
                          '비밀번호가 일치하지 않습니다.',
                      })}
                    />
                    <span className="error-msg">
                      {errors.passwordCheck?.message}
                    </span>
                  </div>

                  <div className="register-input">
                    <label htmlFor="userName">이름</label>
                    <input
                      type="text"
                      id="userName"
                      {...register('userName', {
                        required: '이름을 입력해주세요!',
                        pattern: {
                          message: '이름은 한글 2-6자 사이여야 합니다.',
                          value: /^[가-힣]{2,6}$/,
                        },
                      })}
                    />
                    <span className="error-msg">
                      {errors.userName?.message}
                    </span>
                  </div>

                  <div className="register-input">
                    <label htmlFor="nickname">닉네임</label>
                    <input
                      type="text"
                      id="nickname"
                      {...register('nickname', {
                        required: '닉네임을 입력해주세요!',
                        pattern: {
                          message:
                            '닉네임은 한글, 영어, 숫자로 2-15자 사이여야 합니다.',
                          value: /^[가-힣a-zA-Z0-9]{2,15}$/,
                        },
                      })}
                    />
                    <span className="error-msg">
                      {errors.nickname?.message}
                    </span>
                  </div>

                  <div className="register-input">
                    <label htmlFor="phoneNum">휴대전화번호</label>
                    <input
                      type="text"
                      id="phoneNum"
                      {...register('phoneNum', {
                        required: '휴대전화번호를 입력해주세요!',
                        pattern: {
                          message:
                            '휴대전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다.',
                          value: /^[0-9]{10,11}$/,
                        },
                      })}
                    />
                    <span className="error-msg">
                      {errors.phoneNum?.message}
                    </span>
                  </div>

                  <div className="register-input">
                    <label htmlFor="email">이메일</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: '이메일을 입력해주세요!',
                        pattern: {
                          message:
                            '올바른 이메일 형식이 아닙니다. (예: user@gmail.com)',
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        },
                      })}
                    />
                    <span className="error-msg">{errors.email?.message}</span>
                  </div>

                  <AddressInput
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    defaultVal={defaultAddress}
                  />
                  <button>수정하기</button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import '../styles/pages/Register.scss';
import { useForm } from 'react-hook-form';

// 회원가입 페이지
export default function RegisterPage() {
  const {
    register,               // input 할당, value 변경 감지.
    handleSubmit,           // form submit 시 호출.
    formState: { errors },  // 폼 상태 객체
    watch,                  // 특정 폼 필드의 값을 실시간으로 사용
    setValue,               // 특정 폼 필드의 값을 설정
  } = useForm({
    mode: 'onBlur',         // 유효성 검사를 포커스가 떠날 때 수행
  });

  const onValid = (data) => {
    console.log('onValid >> ', data);
    alert('회원가입이 완료되었습니다!');
  };

  const onInValid = (err) => {
    console.log('onInValid >> ', err);
  };

  // 체크박스 상태 감지
  const chkAll = watch('chk-all');
  const isRequiredAgreed = watch('isRequiredAgreed');
  const isOptionalAgreed = watch('isOptionalAgreed');

  // 개별 체크박스 변경 시 전체 선택 상태 업데이트
  useEffect(() => {
    if (isRequiredAgreed && isOptionalAgreed) {
      setValue('chk-all', true, { shouldValidate: false });
    } else {
      setValue('chk-all', false, { shouldValidate: false });
    }
  }, [isRequiredAgreed, isOptionalAgreed, setValue]);

  // 전체선택 체크박스 핸들러
  const handleChkAll = (e) => {
    const checked = e.target.checked;
    setValue('isRequiredAgreed', checked, { shouldValidate: true });
    setValue('isOptionalAgreed', checked, { shouldValidate: false });
  };

  // 우편번호 및 주소 
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');

  const handleAddressSearch = () => {
    console.log('postcode >> ', window.daum.Postcode);
    
    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostcode(data.zonecode);       // 우편번호 설정
        setAddress(data.address);         // 주소 설정
        setValue('postcode', data.zonecode, { shouldValidate: true });
        setValue('address', data.address, { shouldValidate: true });
      },
    }).open();
  };

  return (
    <div>
      <h2 className='register-title'>회원가입</h2>
      <section className='register-container'>
        <form action="#" id='register' onSubmit={handleSubmit(onValid, onInValid)}>
          <div className='register-input'>
            <label htmlFor="loginId">아이디 </label>
            <input 
              type="text" 
              id='loginId'
              {...register('loginId', {
                required: '아이디를 입력해주세요!',
                pattern: {
                  message: '아이디는 영어, 소문자, 숫자로 6-12 자 사이여야 합니다.',
                  value: /^[a-z0-9]{6,12}$/,
                },
              })} 
            />
            <span className='error-msg'>{errors.loginId?.message}</span>
            <br />

            <label htmlFor="userPw">비밀번호 </label>
            <input
               type="password" 
               id='userPw' 
               {...register('userPw', {
                required: '비밀번호를 입력해주세요!',
                pattern: {
                  message: '비밀번호는 영어와 숫자를 포함하고 8-16자 사이여야 합니다.',
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/,
                },
               })}
            />
            <span className='error-msg'>{errors.userPw?.message}</span>
            <br />

            <label htmlFor="passwordCheck">비밀번호 확인 </label>
            <input 
              type="password" 
              id='passwordCheck' 
              {...register('passwordCheck', {
                required: '비밀번호를 확인해주세요!',
                validate: (value) => value === watch('userPw') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <span className='error-msg'>{errors.passwordCheck?.message}</span>
            <br />

            <label htmlFor="userName">이름 </label>
            <input 
              type="text" 
              id='userName' 
              {...register('userName', {
                required: '이름을 입력해주세요!',
                pattern: {
                  message: '이름은 한글 2-6자 사이여야 합니다.',
                  value: /^[가-힣]{2,6}$/,
                } 
              })}
            />
            <span className='error-msg'>{errors.userName?.message}</span>
            <br />

            <label htmlFor="nickname">닉네임 </label>
            <input 
              type="text" 
              id='nickname' 
              {...register('nickname', {
                required: '닉네임을 입력해주세요!',
                pattern: {
                  message: '닉네임은 한글, 영어, 숫자로 2-15자 사이여야 합니다.',
                  value: /^[가-힣a-zA-Z0-9]{2,15}$/, 
                }
              })}
            />
            <span className='error-msg'>{errors.nickname?.message}</span>
            <br />

            <label htmlFor="phoneNum">휴대전화번호 </label>
            <input 
              type="text" 
              id='phoneNum' 
              {...register('phoneNum', {
                required: '휴대전화번호를 입력해주세요!',
                pattern: {
                  message: '휴대전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다.',
                  value: /^[0-9]{10,11}$/,
                }
              })}  
            />
            <span className='error-msg'>{errors.phoneNum?.message}</span>
            <br />

            <label htmlFor="email">이메일 </label>
            <input 
              type="email" 
              id='email' 
              {...register('email', {
                required: '이메일을 입력해주세요!',
                pattern: {
                  message: '올바른 이메일 형식이 아닙니다. (예: user@gmail.com)',
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                }
              })}
            />
            <span className='error-msg'>{errors.email?.message}</span>
            <br />
          </div>
          
          {/* 주소 */}
          <div className='register-input'>
            <div className='address-input-container'>
              <label htmlFor="address">주소</label>
              <div className='input-address'>
                <input 
                  type="text" 
                  id='postcode' 
                  value={postcode || ''} 
                  readOnly
                  {...register('postcode', {
                    required: '우편 번호를 입력해주세요!',
                  })}  
                />
                <button type='button' onClick={handleAddressSearch}>우편번호 확인</button><br />
              </div>
            </div>

            <input 
              type="text" 
              id='address' 
              value={address || ''} 
              readOnly
              {...register('address', {
                required: '주소를 입력해주세요!',
              })}
            />
            <br />

            <input 
              type="text" 
              id='detailedAddress' 
              {...register('detailedAddress', {
                required: '상세 주소를 입력해주세요!',
              })}
            />
            <br />
            <span className='error-msg'>{errors.detailedAddress?.message}</span>
          </div>

          {/* 약관 동의 */}
          <div className='register-agree-container'>
            <div className='agree-column'>
              <span className='input-chk'>
                <input 
                  type="checkbox" 
                  id='chk-all' 
                  {...register('chk-all')}
                  checked={chkAll}
                  onChange={handleChkAll}
                />
                <label htmlFor="chk-all">이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</label>
              </span>
            </div>

            <div className='agree-column'>
              <span className='input-chk'>
                <input 
                  type="checkbox" 
                  id='isRequiredAgreed' 
                  {...register('isRequiredAgreed', {
                    required: '필수 동의를 체크해주세요.',
                  })}
                />
                <label htmlFor="isRequiredAgreed">리블링스 이용약관 동의(필수)</label>
              </span>
              {errors.isRequiredAgreed && (
                <span className='error-msg'>{errors.isRequiredAgreed.message}</span>
              )}
              <ul>
                <li>
                  <h3>회원가입 시점에 리블링스가 이용자로부터 수집하는 개인정보는 아래와 같습니다.</h3>
                </li>

                <div className='li-list'>
                  <li>
                    - 회원 가입 시에 ‘아이디, 비밀번호, 이름, 가입인증 휴대폰번호, 이메일, 주소’를 필수항목으로 수집합니다.
                  </li>
                  <li>
                    - 회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및 법정대리인의
                      본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
                  </li>
                  <li>
                    - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및
                      이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스
                      요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.
                  </li>
                  <li>
                    - 법령 및 리블링스 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용
                      행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항
                      전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
                  </li>
                  <li>
                    - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을
                      위하여 개인정보를 이용합니다.
                  </li>
                  <li>
                    - 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로
                      개인정보를 이용합니다.
                  </li>
                  <li>
                    - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경
                      구축을 위해 개인정보를 이용합니다.
                  </li>
                  <li>
                    - 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다. 
                      또한 이미지 및 음성을 이용한 검색 서비스 등에서 이미지나 음성이 수집될 수 있습니다.
                  </li>
                </div>
              </ul>
            </div>

            <div className='agree-column'>
              <span className='input-chk'>
                <input 
                  type="checkbox" 
                  id='isOptionalAgreed' 
                  {...register('isOptionalAgreed')}  
                />
                <label htmlFor="isOptionalAgreed">리블링스 이용약관 동의(선택)</label>
              </span>
              <ul>
                <li>
                  <h3>마케팅 수신 동의</h3>
                  - 리블링스의 최신 업데이트 소식을 회원가입시 기재한 고객정보의 이메일, 휴대전화번호로
                    안내를 받을 수 있습니다. 
                </li>
              </ul>
            </div>
          </div>

          <button>가입하기</button>
        </form>
      </section>
    </div>
  );
}

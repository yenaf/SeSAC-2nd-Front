import React, { useState, useEffect } from 'react';

// AddressInput 컴포넌트
export function AddressInput({ register, setValue, errors, defaultVal }) {
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [zipcodeBox, setZipcodeBox] = useState({
    zipcode: '',
    address: '',
    detailedAddress: '',
  });

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZipCode(data.zonecode);
        setAddress(data.address);
        setValue('zipCode', data.zonecode, { shouldValidate: true });
        setValue('address', data.address, { shouldValidate: true });
      },
    }).open();
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때만 defaultVal로 초기화
    if (defaultVal && !zipCode && !address && !detailedAddress) {
      setZipCode(defaultVal.zipCode || '');
      setAddress(defaultVal.address || '');
      setDetailedAddress(defaultVal.detailedAddress || '');

      // form 값도 초기화
      setValue('zipCode', defaultVal.zipCode || '', { shouldValidate: true });
      setValue('address', defaultVal.address || '', { shouldValidate: true });
      setValue('detailedAddress', defaultVal.detailedAddress || '', {
        shouldValidate: true,
      });
    }
  }, [defaultVal, zipCode, address, detailedAddress, setValue]);

  return (
    <div className="register-input">
      <div className="address-input-container">
        <label htmlFor="address">주소</label>
        <div className="input-address">
          <input
            type="text"
            id="zipCode"
            value={zipCode || ''} // 빈 문자열로 초기화
            readOnly
            {...register('zipCode', {
              required: '우편 번호를 입력해주세요!',
            })}
          />
          <button type="button" onClick={handleAddressSearch}>
            우편번호 확인
          </button>
          <br />
        </div>
      </div>
      <input
        type="text"
        id="address"
        value={address || ''} // 빈 문자열로 초기화
        readOnly
        {...register('address', { required: '주소를 입력해주세요!' })}
      />
      <br />
      <br />
      <input
        type="text"
        id="detailedAddress"
        {...register('detailedAddress')}
        value={detailedAddress || ''}
        onChange={(e) => setDetailedAddress(e.target.value)}
      />
      <span className="error-msg">{errors.detailedAddress?.message}</span>
    </div>
  );
}

// AgreementCheckbox 컴포넌트
export function AgreementCheckbox({ register, watch, setValue, errors }) {
  const chkAll = watch('chk-all') || false; // undefined 방지
  const isRequiredAgreed = watch('isRequiredAgreed') || false; // undefined 방지
  const isOptionalAgreed = watch('isOptionalAgreed') || false; // undefined 방지

  useEffect(() => {
    // 필수 및 선택 동의가 모두 선택된 경우 'chk-all'을 true로 설정
    if (isRequiredAgreed && isOptionalAgreed) {
      setValue('chk-all', true, { shouldValidate: false });
    } else {
      setValue('chk-all', false, { shouldValidate: false });
    }
  }, [isRequiredAgreed, isOptionalAgreed, setValue]);

  const handleChkAll = (e) => {
    const checked = e.target.checked;
    // 모든 동의란을 일괄 체크/해제
    setValue('isRequiredAgreed', checked, { shouldValidate: true });
    setValue('isOptionalAgreed', checked, { shouldValidate: false });
  };

  return (
    <div className="register-agree-container">
      <div className="agree-column">
        <span className="input-chk">
          <input
            type="checkbox"
            id="chk-all"
            {...register('chk-all')}
            checked={chkAll}
            onChange={handleChkAll}
          />
          <label htmlFor="chk-all">
            이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </label>
        </span>
      </div>

      <div className="agree-column">
        <span className="input-chk">
          <input
            type="checkbox"
            id="isRequiredAgreed"
            {...register('isRequiredAgreed', {
              required: '필수 동의를 체크해주세요.',
            })}
            checked={isRequiredAgreed}
            onChange={(e) => setValue('isRequiredAgreed', e.target.checked)}
          />
          <label htmlFor="isRequiredAgreed">리블링스 이용약관 동의(필수)</label>
        </span>
        {errors.isRequiredAgreed && (
          <span className="error-msg">{errors.isRequiredAgreed.message}</span>
        )}
        <ul>
          <li>
            <h3>
              회원가입 시점에 리블링스가 이용자로부터 수집하는 개인정보는 아래와
              같습니다.
            </h3>
          </li>

          <div className="li-list">
            <li>
              - 회원 가입 시에 ‘아이디, 비밀번호, 이름, 가입인증 휴대폰번호,
              이메일, 주소’를 필수항목으로 수집합니다.
            </li>
            <li>
              - 회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자
              및 법정대리인의 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등
              회원관리를 위하여 개인정보를 이용합니다.
            </li>
            <li>
              - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적
              분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한
              이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스
              제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여
              개인정보를 이용합니다.
            </li>
            <li>
              - 법령 및 리블링스 이용약관을 위반하는 회원에 대한 이용 제한 조치,
              부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는
              행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정
              등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자
              보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
            </li>
            <li>
              - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및
              서비스의 배송을 위하여 개인정보를 이용합니다.
            </li>
            <li>
              - 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및
              프로모션 목적으로 개인정보를 이용합니다.
            </li>
            <li>
              - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는
              서비스 이용환경 구축을 위해 개인정보를 이용합니다.
            </li>
            <li>
              - 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보,
              위치정보가 생성되어 수집될 수 있습니다. 또한 이미지 및 음성을
              이용한 검색 서비스 등에서 이미지나 음성이 수집될 수 있습니다.
            </li>
          </div>
        </ul>
      </div>

      <div className="agree-column">
        <span className="input-chk">
          <input
            type="checkbox"
            id="isOptionalAgreed"
            {...register('isOptionalAgreed')}
            checked={isOptionalAgreed}
            onChange={(e) => setValue('isOptionalAgreed', e.target.checked)}
          />
          <label htmlFor="isOptionalAgreed">리블링스 이용약관 동의(선택)</label>
        </span>
        <ul>
          <li>
            <h3>마케팅 수신 동의</h3>- 리블링스의 최신 업데이트 소식을
            회원가입시 기재한 고객정보의 이메일, 휴대전화번호로 안내를 받을 수
            있습니다.
          </li>
        </ul>
      </div>
    </div>
  );
}

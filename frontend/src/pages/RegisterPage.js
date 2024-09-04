import React, { useState } from 'react';
import '../styles/pages/Register.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import userData from '../data/fakedata/userData'; //user 더미데이터
import axios from 'axios';
import {
  FormInput,
  AddressInput,
  AgreementCheckbox,
} from '../components/Register';

export default function RegisterPage() {
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
      loginId: '', // 빈 문자열로 초기화
      userPw: '', // 빈 문자열로 초기화
      passwordCheck: '', // 빈 문자열로 초기화
      userName: '', // 빈 문자열로 초기화
      nickname: '', // 빈 문자열로 초기화
      phoneNum: '', // 빈 문자열로 초기화
      email: '', // 빈 문자열로 초기화
      postcode: '', // 빈 문자열로 초기화 (주소 관련)
      address: '', // 빈 문자열로 초기화 (주소 관련)
      detailedAddress: '', // 빈 문자열로 초기화 (주소 관련)
    },
  });

  const navigate = useNavigate();

  // 아이디 중복 체크
  const checkLoginId = async (loginId) => {
    console.log(loginId);
    try {
      // const res = await axios.get('http://localhost:8080/user/checkLoginid', {
      //   params: loginId,
      // });
      const res = await axios.post('http://localhost:8080/user/checkLoginid', {
        loginId,
      });
      console.log('res >> ', res);
      if (res.status === 409) {
        setError('loginId', { type: 'manual', message: res.data.message });
        return false;
      }
      return true;
    } catch (error) {
      setError('loginId', {
        type: 'manual',
        message: '아이디 중복 검사 실패. 다시 시도해주세요.',
      });
      return false;
    }
  };

  // 닉네임 중복 체크
  const checkNickname = async (nickname) => {
    try {
      const res = await axios.post('http://localhost:8080/user/checkNickname', {
        nickname,
      });
      if (res.status === 409) {
        setError('nickname', { type: 'manual', message: res.data.message });
        return false;
      }
      return true;
    } catch (error) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임 중복 검사 실패. 다시 시도해주세요.',
      });
      return false;
    }
  };

  const onValidApi = async (data) => {
    console.log('data >> ', data);
    try {
      // 아이디 중복 검사
      const isLoginIdValid = await checkLoginId(data.loginId);
      if (!isLoginIdValid) return;

      // 닉네임 중복 검사
      const isNicknameValid = await checkNickname(data.nickname);
      if (!isNicknameValid) return;

      const res = await axios.post('http://localhost:8080/user/register', data);
      if (res.status === 200) {
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 임시 회원가입
  // const onValid = (data) => {
  //   console.log('onValid >> ', data);
  //   alert('회원가입이 완료되었습니다!');
  //   // navigate('/');  // 메인페이지로 이동
  // };

  const onInValid = (err) => {
    console.log('onInValid >> ', err);
  };

  return (
    <div>
      <h2 className="register-title">회원가입</h2>
      <section className="register-container">
        <form
          action="#"
          id="register"
          onSubmit={handleSubmit(onValidApi, onInValid)}
        >
          <div className="register-input">
            <label htmlFor="loginId">아이디</label>
            <input
              type="text"
              id="loginId"
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
                  value === watch('userPw') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <span className="error-msg">{errors.passwordCheck?.message}</span>
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
            <span className="error-msg">{errors.userName?.message}</span>
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
            <span className="error-msg">{errors.nickname?.message}</span>
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
            <span className="error-msg">{errors.phoneNum?.message}</span>
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
          />

          <AgreementCheckbox
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
          <button>가입하기</button>
        </form>
      </section>
    </div>
  );
}

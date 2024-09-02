import React, { useState } from 'react';
import '../styles/pages/Register.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  FormInput,
  AddressInput,
  AgreementCheckbox,
} from '../components/Register';
import axios from 'axios';

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
  });

  const navigate = useNavigate();

  // // 아이디 중복 체크
  // const checkLoginId = async (loginId) => {
  //   try {
  //     const res = await axios.get('/checkLoginid', { params: { loginId } });
  //     if (res.status === 409) {
  //       setError('loginId', { type: 'manual', message: res.data.message });
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     setError('loginId', { type: 'manual', message: '아이디 중복 검사 실패. 다시 시도해주세요.' });
  //     return false;
  //   }
  // };

  // // 닉네임 중복 체크
  // const checkNickname = async (nickname) => {
  //   try {
  //     const res = await axios.get('/checkNickname', { params: { nickname } });
  //     if (res.status === 409) {
  //       setError('nickname', { type: 'manual', message: res.data.message });
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     setError('nickname', { type: 'manual', message: '닉네임 중복 검사 실패. 다시 시도해주세요.' });
  //     return false;
  //   }
  // };

  // const onValidApi = async (data) => {
  //   try {
  //     // 아이디 중복 검사
  //     const isLoginIdValid = await checkLoginId(data.loginId);
  //     if (!isLoginIdValid) return;

  //     // 닉네임 중복 검사
  //     const isNicknameValid = await checkNickname(data.nickname);
  //     if (!isNicknameValid) return;

  //     const res = await axios.post('user/register', data);
  //     if (res.status === 200) {
  //       alert('회원가입이 완료되었습니다!');
  //       navigate('/');
  //     } else {
  //       alert('회원가입에 실패했습니다. 다시 시도해주세요.');
  //     }
  //   } catch (error) {
  //     console.error('회원가입 오류:', error);
  //     alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
  //   }
  // };

  const onValid = (data) => {
    console.log('onValid >> ', data);
    alert('회원가입이 완료되었습니다!');
    // navigate('/');  // 메인페이지로 이동
  };

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
          onSubmit={handleSubmit(onValid, onInValid)}
        >
          <FormInput
            label="아이디"
            id="loginId"
            type="text"
            register={register}
            validation={{
              required: '아이디를 입력해주세요!',
              pattern: {
                message:
                  '아이디는 영어, 소문자, 숫자로 6-12 자 사이여야 합니다.',
                value: /^[a-z0-9]{6,12}$/,
              },
            }}
            errors={errors}
          />
          {/* {errors.loginId && <span className="error-msg">{errors.loginId.message}</span>} */}
          <FormInput
            label="비밀번호"
            id="userPw"
            type="password"
            register={register}
            validation={{
              required: '비밀번호를 입력해주세요!',
              pattern: {
                message:
                  '비밀번호는 영어와 숫자를 포함하고 8-16자 사이여야 합니다.',
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/,
              },
            }}
            errors={errors}
          />
          <FormInput
            label="비밀번호 확인"
            id="passwordCheck"
            type="password"
            register={register}
            validation={{
              required: '비밀번호를 확인해주세요!',
              validate: (value) =>
                value === watch('userPw') || '비밀번호가 일치하지 않습니다.',
            }}
            errors={errors}
          />
          <FormInput
            label="이름"
            id="userName"
            type="text"
            register={register}
            validation={{
              required: '이름을 입력해주세요!',
              pattern: {
                message: '이름은 한글 2-6자 사이여야 합니다.',
                value: /^[가-힣]{2,6}$/,
              },
            }}
            errors={errors}
          />
          <FormInput
            label="닉네임"
            id="nickname"
            type="text"
            register={register}
            validation={{
              required: '닉네임을 입력해주세요!',
              pattern: {
                message: '닉네임은 한글, 영어, 숫자로 2-15자 사이여야 합니다.',
                value: /^[가-힣a-zA-Z0-9]{2,15}$/,
              },
            }}
            errors={errors}
          />
          <FormInput
            label="휴대전화번호"
            id="phoneNum"
            type="text"
            register={register}
            validation={{
              required: '휴대전화번호를 입력해주세요!',
              pattern: {
                message:
                  '휴대전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다.',
                value: /^[0-9]{10,11}$/,
              },
            }}
            errors={errors}
          />
          <FormInput
            label="이메일"
            id="email"
            type="email"
            register={register}
            validation={{
              required: '이메일을 입력해주세요!',
              pattern: {
                message: '올바른 이메일 형식이 아닙니다. (예: user@gmail.com)',
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              },
            }}
            errors={errors}
          />
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

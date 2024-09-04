import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/pages/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userData from '../data/fakedata/userData';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loginFn } from '../store/loginSlice';

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 아이디 체크
  const checkId = async (loginId) => {
    try {
      const res = await axios.get('', { params: { loginId } });
      if (res.status === 409) {
        setError('loginId', { type: 'manual', message: res.data.message });
        return false;
      }
      return true;
    } catch (error) {
      setError('loginId', {
        type: 'manual',
        message:
          '알 수 없는 오류로 로그인에 실패하였습니다.. 다시 로그인해주세요!',
      });
      return false;
    }
  };

  // 비밀번호 체크
  const checkPw = async (userPw) => {
    try {
      const res = await axios.get('', { params: { userPw } });
      if (res.status === 409) {
        setError('userPw', { type: 'manual', message: res.data.message });
        return false;
      }
      return true;
    } catch (error) {
      setError('userPw', {
        type: 'manual',
        message:
          '알 수 없는 오류로 로그인에 실패하였습니다.. 다시 로그인해주세요!',
      });
      return false;
    }
  };

  // 로그인
  const onSubmitApi = async (data) => {
    try {
      // 아이디 검사
      const isCheckId = await checkId(data.loginId);
      if (!isCheckId) return;

      // 비밀번호 검사
      const isCheckPw = await checkPw(data.userPw);
      if (!isCheckPw) return;

      const res = await axios.get('', data);
      if (res.status === 200) {
        alert('로그인 성공!');
        const loginContainer = document.querySelector('.login-container');
        loginContainer.style.display = 'none';
        dispatch(loginFn(true));
        navigate('/'); // 메인페이지로 이동
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  // 로그인창 닫기 버튼
  const loginClose = () => {
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'none';
  };

  // 임시 로그인
  const onSubmit = (data) => {
    console.log('onSubmit >> ', data);
    alert('로그인 성공!');
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'none';
    dispatch(loginFn(true));
    navigate('/'); // 메인페이지로 이동
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-close">
          <button>
            <FontAwesomeIcon icon={faXmark} onClick={loginClose} />
          </button>
        </div>
        <h2 className="login-title">로그인</h2>
        <form action="#" id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input">
            <input
              type="text"
              id="loginId"
              placeholder="아이디"
              {...register('loginId', {
                required: '아이디를 입력해주세요!',
              })}
            />
            <span className="error-msg">{errors.loginId?.message}</span>
          </div>
          <div className="login-input">
            <input
              type="password"
              id="userPw"
              placeholder="비밀번호"
              {...register('userPw', {
                required: '비밀번호를 입력해주세요!',
              })}
            />
            <span className="error-msg">{errors.userPw?.message}</span>
          </div>
          <button>로그인</button>
        </form>
        <div className="login-register">
          <span>아직 회원이 아니신가요?</span>
          <span>
            <Link to={'/user/register'} onClick={loginClose}>
              회원가입 하러가기
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

/*
  로그인 컴포넌트에서
  아이디, 비밀번호 비교 (디비에 있는지? 값이 맞는지)

  로그인창에서 엑스버튼을 누르거나, 회원기입 하러가기를 누르면
  display = 'none';

  로그인 정보를 입력하고 로그인 버튼을 누르면
  loginContainer.remove();
*/

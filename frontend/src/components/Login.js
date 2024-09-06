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

  // 로그인
  const onSubmitApi = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/user/login', data, {
        withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
      });
      console.log('res >> ', res);

      if (res.status === 200) {
        alert('로그인 성공!');

        // 로그인 성공시 로그인 모달 hidden
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
          loginContainer.style.display = 'none';
        }

        // Redux를 통해 로그인 상태 관리 (dispatch 사용)
        dispatch(loginFn(true));

        // 메인페이지로 이동
        navigate('/');
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      console.log('error.response:', error.response);

      // 백엔드에서 응답한 오류 메시지를 표시
      const errorMessage = error.response?.data?.error;

      if (errorMessage) {
        // 백엔드에서 보낸 error 메시지가 있으면 그대로 표시
        alert(errorMessage);
      } else {
        // 예상치 못한 에러 처리
        if (error.response && error.response.status === 401) {
          alert('아이디 또는 비밀번호를 찾을 수 없습니다.');
        } else if (error.response && error.response.status === 404) {
          alert('아이디 또는 비밀번호를 찾을 수 없습니다.');
        } else {
          alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  // 로그인창 닫기 버튼
  const loginClose = () => {
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'none';
  };

  // 임시 로그인
  // const onSubmit = (data) => {
  //   console.log('onSubmit >> ', data);
  //   alert('로그인 성공!');
  //   const loginContainer = document.querySelector('.login-container');
  //   loginContainer.style.display = 'none';
  //   dispatch(loginFn(true));
  //   navigate('/'); // 메인페이지로 이동
  // };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-close">
          <button>
            <FontAwesomeIcon icon={faXmark} onClick={loginClose} />
          </button>
        </div>
        <h2 className="login-title">로그인</h2>
        <form action="#" id="login-form" onSubmit={handleSubmit(onSubmitApi)}>
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

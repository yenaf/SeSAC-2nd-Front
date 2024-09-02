import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/pages/Login.scss';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-close">
          <button>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h2 className="login-title">로그인</h2>
        <form action="#" id="login-form">
          <div className="login-input">
            <input type="text" />
          </div>
          <div className="login-input">
            <input type="password" />
          </div>
          <button>로그인</button>
        </form>
        <div className="login-register">
          <span>아직 회원이 아니신가요?</span>
          <span>
            <Link to={'/user/register'}>회원가입 하러가기</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

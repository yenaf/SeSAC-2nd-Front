import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/NotFound.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404 Error</h2>
      <Link to="/">홈으로 가기</Link>
    </div>
  );
}

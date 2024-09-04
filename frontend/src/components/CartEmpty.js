import React from 'react';
import { Link } from 'react-router-dom';

export default function CartEmpty() {
  return (
    <div>
      <span>장바구니에 담긴 상품이 없습니다.</span>
      <Link to={'/posts/list/:page/:limit/0'}>상품 구경하러 가기</Link>
    </div>
  );
}

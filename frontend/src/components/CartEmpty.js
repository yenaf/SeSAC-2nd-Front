import React from 'react';
import { Link } from 'react-router-dom';

// 빈 장바구니 페이지 컴포넌트
export default function CartEmpty() {
  return (
    <div className="cart-emptybx">
      <h3>장바구니에 담긴 상품이 없습니다.</h3>
      <Link to={'/'}>메인으로 가기</Link>
    </div>
  );
}

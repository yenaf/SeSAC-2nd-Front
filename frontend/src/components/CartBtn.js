import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { insertCart } from '../api/cart';
import { UserContext } from '../hooks/useAuth';

// 상세페이지 장바구니 버튼 컴포넌트
export default function CartBtn({ post, sellStatus, sellerId }) {
  const { isLogin, isAdmin, isSeller } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const modalRef = useRef();
  const { user } = useContext(UserContext);

  const addCart = async () => {
    const cartModel = modalRef.current;
    if (isAdmin) {
      alert('관리자 계정은 장바구니를 이용할 수 없습니다.');
      return;
    }
    if (isLogin) {
      if (sellStatus !== '판매 중') {
        alert('이미 판매된 상품입니다.');
        return;
      }
      if (user.sellerId === sellerId) {
        alert('자기 자신의 물건은 장바구니에 담을 수 없습니다.');
        return;
      }
      try {
        const res = await insertCart(post, post);
        if (res.status === 200) {
          cartModel.style.display = 'block';
        }
      } catch (err) {
        console.error(err);
        if (err.status === 409) {
          alert('이미 장바구니에 담겨 있는 상품입니다.');
        }
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const closeModal = (e) => {
    const modal = e.target.parentNode.parentNode.parentNode;
    modal.style.display = 'none';
  };

  const goCart = (e) => {
    const modal = e.target.parentNode.parentNode.parentNode;
    modal.style.display = 'none';
    navigate('/cart');
  };

  return (
    <div>
      <span className="link-container">
        <button
          className={`btn shopping ${sellStatus !== '판매 중' ? 'unable' : ''}`}
          onClick={addCart}
        >
          장바구니
        </button>
        <button
          className={`btn buy ${sellStatus !== '판매 중' ? 'unable' : ''}`}
          onClick={addCart}
        >
          구매하기
        </button>
      </span>
      <div className="cart-modal" ref={modalRef}>
        <div className="cart-modalContainer">
          <h3 className="cart-modalComment">장바구니에 상품을 담았습니다.</h3>
          <div className="cart-modalBtns">
            <button className="cart-modalClose" onClick={closeModal}>
              계속 쇼핑하기
            </button>
            <button className="cart-modalGoCart" onClick={goCart}>
              장바구니 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

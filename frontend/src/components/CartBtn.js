import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { insertCart } from '../api/cart';

export default function CartBtn({ post }) {
  const navigate = useNavigate();

  const addCart = async () => {
    const cartModel = document.querySelector('.cart-modal');
    try {
      // 임시 userId 보내주기
      // const res = await insertCart(post);
      const res = await insertCart(post, 1);
      if (res.status === 200) {
        cartModel.style.display = 'block';
      }
      console.log(res);
    } catch (err) {
      console.error(err);
      if (err.status === 409) {
        alert('이미 장바구니에 담겨 있는 상품입니다.');
      }
    }
  };

  // 결제하기 이거 얘기해봐야할듯!
  const buyItem = () => {};

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
        <button className="btn shopping" onClick={addCart}>
          장바구니
        </button>
        <button className="btn buy" onClick={buyItem}>
          구매하기
        </button>
      </span>
      <div className="cart-modal">
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

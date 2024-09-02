import React, { useEffect, useRef, useState, forwardRef } from 'react';
import SellerByCart from '../components/SellerByCart';
import priceToString from '../utils/priceMethods';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { totalPrice, totalZero, deleteItem } from '../store/cartSlice';
import PaymentInfo from './PaymentInfo';

export default function Cart() {
  const { cartData, totalAmount, totalDeliveryFee, totalPayment } = useSelector(
    (state) => state.cart,
  );
  console.log(cartData);
  const checkAllRef = useRef();
  const checkEachRef = useRef([]);

  const dispatch = useDispatch();

  // 전체선택 체크
  const handleCheckAll = () => {
    // 전체선택 체크 해제시 전부 해제 선택 시 전부 선택
    const checkEach = document.querySelectorAll('.cartItem-check input');
    checkEach.forEach((el) => (el.checked = checkAllRef.current.checked));
    const allCheck = checkAllRef.current.checked;
    // 전체선택 시 금액 표시 변경
    if (!allCheck) dispatch(totalZero());
    else dispatch(totalPrice());
  };

  // 개별선택 체크
  const handlecheckEach = (e) => {
    const checkedEachNum = document.querySelectorAll(
      '.cartItem-check input:checked',
    ).length;
    const checkEachNum = document.querySelectorAll(
      '.cartItem-check input',
    ).length;

    // 개별 체크 박스 체크 시 전체 체크박스 변경
    if (checkedEachNum === checkEachNum) checkAllRef.current.checked = true;
    else checkAllRef.current.checked = false;
  };

  // 선택삭제
  const deleteCheck = () => {
    const checkedEach = document.querySelectorAll(
      '.cartItem-check input:checked',
    );
    checkedEach.forEach((ele) => {
      const cartNum = ele.getAttribute('data-cart');
      dispatch(deleteItem(cartNum));
    });

    // 전체 체크박스와 선택박스 상태 초기화
    checkAllRef.current.checked = false;
    handleCheckAll(); // 금액 갱신
  };

  const postCartNumbers = (e) => {
    e.preventDefault();
    /*
      비동기?? post -> req.body 에 cartId들을 배열로 넘겨줌
      백엔드에서 넘겨주는 데이터를 받아와서 렌더링
      post -> data 받음
      res.then (
        navigate('/order')
      )
    */
  };
  // useEffect(() => {}, [dispatch]);
  return (
    <>
      {/* 장바구니 아이템 */}
      <section className="cart-items">
        {/* 전체선택/선택삭제 */}
        <div className="cart-selection">
          {/* 전체선택 */}
          <div className="allitem-checkbx">
            <input
              type="checkbox"
              id="chk-allitem"
              name="chk-allitem"
              defaultChecked
              ref={checkAllRef}
              onChange={handleCheckAll}
            />
            <label htmlFor="chk-allitem">전체선택</label>
          </div>
          {/* <button className="chk-deleteBtn" onClick={deleteCheck}>
            선택삭제
          </button> */}
        </div>
        <ul className="cart-itemLists">
          {/* 장바구니 아이템들, 판매자별로 묶어서 보여주기 */}
          {cartData.map((value, idx) => (
            <SellerByCart
              key={value.sellerId}
              cart={value}
              forwardRef={checkEachRef}
              handleCheckEach={handlecheckEach}
            />
          ))}
        </ul>
      </section>
      {/* 장바구니에 들어있는 아이템들 선택된 것들에 대한 비용 */}
      <section className="cart-amount">
        <div className="cart-amountBx">
          <PaymentInfo
            pageInfo={'cart'}
            price={{ totalAmount, totalDeliveryFee, totalPayment }}
          />
          <div className="cart-paymentBtn">
            <Link to="/order" onClick={postCartNumbers}>
              결제하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

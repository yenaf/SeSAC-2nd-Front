import React from 'react';
import SellerByCart from '../components/SellerByCart';
import priceToString from '../utils/priceMethods';

export default function Cart({ cart }) {
  return (
    <>
      {/* 장바구니 아이템 */}
      <section className="cart-items">
        {/* 전체선택/선택삭제 */}
        <div className="cart-selection">
          {/* 전체선택 */}
          <div className="allitem-checkbx">
            <input type="checkbox" id="chk-allitem" name="chk-allitem" />
            <label htmlFor="chk-allitem">전체선택</label>
          </div>
          <button className="chk-deleteBtn">선택삭제</button>
        </div>
        <ul className="cart-itemLists">
          {/* 장바구니 아이템들, 판매자별로 묶어서 보여주기 */}
          {cart.map((value, idx) => (
            <SellerByCart key={idx} cart={value} />
          ))}
        </ul>
      </section>
      {/* 장바구니에 들어있는 아이템들 선택된 것들에 대한 비용 */}
      <section className="cart-amount">
        <div className="cart-amountBx">
          <div className="cart-totalAmount">
            <span>총 상품금액</span>
            <span></span>
          </div>
          <div className="cart-totalDevelivetyFee">
            <span>총 배송비</span>
            <span>+</span>
          </div>
          <div className="cart-payment">
            <span>결제금액</span>
            <span></span>
          </div>
          <div className="cart-paymentBtn">
            <button>결제하기</button>
          </div>
        </div>
      </section>
    </>
  );
}

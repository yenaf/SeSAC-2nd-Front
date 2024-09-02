import React from 'react';
import { AddressInput } from '../components/Register';
import PaymentInfo from '../components/PaymentInfo';
import { Link } from 'react-router-dom';

// 주문 번호가 랜덤으로 생성된다(숫자+문자 10자리)
// 현재년도(숫자4자리) + 랜덤문자(문자2자리) + 랜덤숫자 4자리 -> 중복검사를 해야하나?

// 결제 페이지
export default function OrderPage() {
  const submitPayment = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>주문서</h2>
      {/* 1. 주문정보 -> map써서 판매자별로 묶어서 반복, 장바구니 페이지처럼*/}
      <section className="order-itemInfo">
        <h2>주문정보</h2>
        <>
          {/* 판매자정보 */}
          <h3 className="order-seller">
            <div className="seller-info">
              <span className="seller-name"></span> / &nbsp;
              <span className="seller-deliveryFee">배송비 : </span>
            </div>
          </h3>
          {/* 아이템 리스트 -> map 써서 아이템 별로 묶어서 반복, 장바구니 페이지처럼 */}
          <ol>
            <li>
              <figure className="orderItem-img">
                <img src="" alt="" />
              </figure>
              <div className="orderItem-info">
                <h5 className="orderItem-category"></h5>
                <h4 className="orderItem-title"></h4>
                <div className="orderItem-state">
                  <span className="orderItme-type"></span>
                  <span className="orderItme-status"></span>
                </div>
                <div className="orderItem-price"></div>
              </div>
            </li>
          </ol>
        </>
      </section>
      {/* 2. 주문고객정보 -> userId 가져와서 이름/이메일/전화번호 정보(readOnly)*/}
      <section className="order-userInfo">
        <h2>주문고객정보</h2>
        <div className="order-userInfoBx">
          <div className="orderUser-name">
            <label>이름</label>
            <input type="text" readOnly />
          </div>
          <div className="orderUser-email">
            <label>이메일</label>
            <input type="email" readOnly />
          </div>
          <div className="orderUser-phone">
            <label>전화번호</label>
            <input type="number" readOnly />
          </div>
        </div>
      </section>
      {/* 3. 배송지 */}
      <section className="order-addrInfo">
        <h2>배송지</h2>
        <button className="order-changeAddrBtn">배송지 변경</button>
        <div className="order-addrInfoBx">
          <div className="order-addrName"></div>
          <div className="order-addrReceiver"></div>
          <div className="order-addrPhoneNum"></div>
          {/* <AddressInput /> */}
        </div>
      </section>
      {/* 4. 리블링머니 */}
      <section className="order-balanceInfo">
        <h2>리블링머니</h2>
        <div className="order-balanceInput">
          <input type="number" placeholder="0" />
          <button>전액사용</button>
        </div>
        <div className="order-balance">
          <span>사용 가능 금액</span>
          <span>원</span>
        </div>
      </section>
      {/* 5. 결제금액 */}
      <section className="order-paymentInfo">
        <h2>결제금액</h2>
        <PaymentInfo
          pageInfo={'order'}
          // 초기설정 -> 주문정보의 금액을 받아와서 넘겨줘야함
          price={{ totalAmount: 0, totalDeliveryFee: 0, totalPayment: 0 }}
        />
      </section>
      {/* 6.결제하기 버튼 */}
      <section className="order-paymentBtn">
        <div className="order-checkbox">
          <input type="checkbox" id="order-check" name="order-check" />
          <label htmlFor="order-check">
            주문정보를 확인하였으며 결제에 동의합니다.
          </label>
        </div>
        <Link to={'/order/complete/:orderId'} onClick={submitPayment}>
          결제하기
        </Link>
      </section>
    </div>
  );
}

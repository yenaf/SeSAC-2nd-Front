import React from 'react';
import { AddressInput } from '../components/Register';
import { useDispatch, useSelector } from 'react-redux';
import orderData from '../data/fakedata/orderData';
import PaymentInfo from '../components/PaymentInfo';
import { Link } from 'react-router-dom';
import priceToString from '../utils/priceMethods';
import SellerByOrder from '../components/SellerByOrder';
import '../styles/pages/OrderPage.scss';

// 주문 번호가 랜덤으로 생성된다(숫자+문자 10자리)
// 현재년도(숫자4자리) + 랜덤문자(문자2자리) + 랜덤숫자 4자리 -> 중복검사를 해야하나?

// 결제 페이지
export default function OrderPage() {
  const {
    sellerByOrderData,
    orderTotalAmount,
    orderTotalDeliveryFee,
    orderTotalPayment,
  } = useSelector((state) => state.cart);

  const { userInfo, addressInfo } = orderData;

  console.log(sellerByOrderData);

  const useBalance = () => {};

  const submitPayment = (e) => {
    e.preventDefault();
  };

  return (
    <div className="order">
      <h2 className="order-title">주문서</h2>
      {/* 1. 주문정보 */}
      <section className="order-itemInfo">
        <h2>주문정보</h2>
        {sellerByOrderData.map((value, idx) => (
          <SellerByOrder key={idx} order={value} />
        ))}
      </section>
      {/* 2. 주문고객정보 -> userId 가져와서 이름/이메일/전화번호 정보*/}
      <section className="order-userInfo">
        <h2>주문고객정보</h2>
        <div className="order-userInfoBx">
          <div className="orderUser-name">{userInfo.userName}</div>
          <div className="orderUser-email">{userInfo.email}</div>
          <div className="orderUser-phone">{userInfo.phoneNum}</div>
        </div>
      </section>
      {/* 3. 배송지 */}
      <section className="order-addrInfo">
        <h2>배송지</h2>
        <button className="order-changeAddrBtn">배송지 변경</button>
        <div className="order-addrInfoBx">
          <div className="order-addrName">{addressInfo.addName}</div>
          <div className="order-addrReceiver">{addressInfo.receiver}</div>
          <div className="order-addrPhoneNum">{addressInfo.phoneNum}</div>
          <div className="order-addrZipCode">{addressInfo.zipCode}</div>
          <div className="order-addr">{addressInfo.address}</div>
          {addressInfo.detailedAddress ? (
            <div className="order-addr">{addressInfo.detailedAddress}</div>
          ) : null}
        </div>
      </section>
      {/* 4. 리블링머니 */}
      <section className="order-balanceInfo">
        <h2>리블링머니</h2>
        <div className="order-balanceInput">
          <input type="number" placeholder="0" onChange={useBalance} />
          <button>전액사용</button>
        </div>
        <div className="order-balance">
          <span>사용 가능 금액</span>
          <span>{priceToString(orderData.userInfo.balance)}원</span>
        </div>
      </section>
      {/* 5. 결제금액 */}
      <section className="order-paymentInfo">
        <h2>결제금액</h2>
        <PaymentInfo
          pageInfo={'order'}
          price={{
            totalAmount: orderTotalAmount,
            totalDeliveryFee: orderTotalDeliveryFee,
            totalPayment: orderTotalPayment,
          }}
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

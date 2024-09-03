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
      <div className="order-bx">
        <article className="order-infos">
          {/* 1. 주문정보 */}
          <section className="order-itemInfo">
            <h2>주문정보</h2>
            <ul className="order-itemLists">
              {sellerByOrderData.map((value, idx) => (
                <SellerByOrder key={idx} order={value} />
              ))}
            </ul>
          </section>
          {/* 2. 주문고객정보 -> userId 가져와서 이름/이메일/전화번호 정보*/}
          <section className="order-userInfo">
            <h2>주문고객정보</h2>
            <div className="order-userInfoBx">
              <div className="orderUser-name">
                <div>이름</div>
                <div>{userInfo.userName}</div>
              </div>
              <div className="orderUser-email">
                <div>이메일</div>
                <div>{userInfo.email}</div>
              </div>
              <div className="orderUser-phone">
                <div>전화번호</div>
                <div>{userInfo.phoneNum}</div>
              </div>
            </div>
          </section>
          {/* 3. 배송지 */}
          <section className="order-addrInfo">
            <div className="order-addrTitle">
              <h2>배송지</h2>
              <button className="order-chgAddrBtn">배송지 변경</button>
            </div>
            <div className="order-addrInfoBx">
              <div className="order-addrName">
                <div>배송지명</div>
                <div>{addressInfo.addName}</div>
              </div>
              <div className="order-addrReceiver">
                <div>받는 분</div>
                <div>{addressInfo.receiver}</div>
              </div>
              <div className="order-addrPhoneNum">
                <div>전화번호</div>
                <div>{addressInfo.phoneNum}</div>
              </div>
              <div className="order-addrZipCode">
                <div>우편번호</div>
                <div>{addressInfo.zipCode}</div>
              </div>
              <div className="order-addr">
                <div>주소</div>
                <div>{addressInfo.address}</div>
              </div>
              {addressInfo.detailedAddress ? (
                <div className="order-detailedAddr">
                  <div>상세주소</div>
                  <div>{addressInfo.detailedAddress}</div>
                </div>
              ) : null}
            </div>
          </section>
          {/* 4. 리블링머니 */}
          <section className="order-balanceInfo">
            <h2>리블링머니</h2>
            <div className="order-balanceBx">
              <div className="order-balanceInput">
                <input type="number" placeholder="0" onChange={useBalance} />
                <button>전액사용</button>
              </div>
              <div className="order-balance">
                <span>사용 가능 금액 </span>
                <span>{priceToString(orderData.userInfo.balance)}</span>
                <span> 원</span>
              </div>
            </div>
          </section>
        </article>
        <article className="order-paymentInfos">
          {/* 5. 결제금액 */}
          <section className="order-paymentBx">
            <h2>결제금액</h2>
            <div className="order-paymentInfo">
              <PaymentInfo
                pageInfo={'order'}
                price={{
                  totalAmount: orderTotalAmount,
                  totalDeliveryFee: orderTotalDeliveryFee,
                  totalPayment: orderTotalPayment,
                }}
              />
            </div>
            {/* 6.결제하기 버튼 */}
            <div className="order-checkbox">
              <input type="checkbox" id="order-check" name="order-check" />
              <label htmlFor="order-check">
                주문정보를 확인하였으며 결제에 동의합니다.
              </label>
            </div>
            <div className="order-paymentBtn">
              <Link to={'/order/complete/:orderId'} onClick={submitPayment}>
                결제하기
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

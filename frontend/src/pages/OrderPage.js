import React, { useRef, useState } from 'react';
import { AddressInput } from '../components/Register';
import { useDispatch, useSelector } from 'react-redux';
import orderData from '../data/fakedata/orderData';
import PaymentInfo from '../components/PaymentInfo';
import { Link, useNavigate } from 'react-router-dom';
import priceToString from '../utils/priceMethods';
import SellerByOrder from '../components/SellerByOrder';
import axios from 'axios';
import '../styles/pages/OrderPage.scss';
import DeliverySelect from '../components/DeliverySelect';

// 결제 페이지
export default function OrderPage() {
  const {
    sellerByOrderData,
    orderTotalAmount,
    orderTotalDeliveryFee,
    orderTotalPayment,
  } = useSelector((state) => state.cart);

  const { userInfo, addressInfo, postInfo } = orderData;
  const [orderCreate, setOrderCreate] = useState([]);
  const balanceInputRef = useRef();

  const navigate = useNavigate();

  // 리블링 머니 사용
  const useBalance = (e) => {
    console.log(e.target.value);
    const balanceComment = document.querySelector('.order-balanceComment');
    if (e.target.value > userInfo.balance) {
      balanceComment.innerText = '잔액이 부족합니다.';
      return (e.target.value = '');
    }
    if (e.target.value < 1) {
      balanceComment.innerText = '0이상 입력해주세요.';
      return (e.target.value = '');
    }
  };

  // 전액 사용 버튼 클릭
  const useAllBalance = (e) => {
    const balanceInput = balanceInputRef.current;
    const balanceComment = document.querySelector('.order-balanceComment');
    if (userInfo.balance < orderTotalPayment) {
      balanceComment.innerText = '잔액이 부족합니다.';
      return;
    }
    balanceInput.value = orderTotalPayment;
    console.log(balanceInput.value);
  };

  // 결제하기 버튼 클릭
  const submitPayment = async (e) => {
    e.preventDefault();

    const isOrderCheck = document.querySelector('#order-check');
    const isOrdercheckComment =
      isOrderCheck.nextElementSibling.nextElementSibling;

    // 판매불가 상품 있는 지 확인
    console.log(postInfo);
    postInfo.forEach((item) => {
      const { sellStatus } = item.Post;
      console.log(sellStatus);
      if (sellStatus !== '판매 중') {
        isOrdercheckComment.innerText = '구매 불가 상품이 포함되어 있습니다.';
        return;
      }
    });

    // 결제 진행사항 동의 체크 여부 확인
    if (!isOrderCheck.checked) {
      isOrdercheckComment.innerText = '결제 진행 필수사항을 동의해주세요.';
      return;
    }
    // 리블링 머니 잔액 확인
    const balanceInput = balanceInputRef.current;
    if (balanceInput.value < orderTotalPayment || !balanceInput.value) {
      isOrdercheckComment.innerText = '리블링머니를 입력해주세요.';
      return;
    }

    /*
      줘야할 데이터 배열내 객체로 [{판매글1}, {판매글2}, {판매글3}]
      구매테이블의 -> 판매글번호, 판매자번호, 배송지, 판매글가격 + 배송비
      생성되야할 데이터
      [
        {
          postId : 1, // 판매글번호
          cartId : 1, // 장바구니 번호
          sellerId : 1, // 판매자번호
          address : '서울시 영등포구', // 배송지
          productPrice : 10000, // 판매글 가격
          deliveryPrice : 3000, // 배송비, 판매자별 첫번째 아이템만 가격붙고 나머지는 0
          totalPrice : 13000 // 판매글가격 + 배송비
        }
      ]
    */
    // 배송지 정보
    const addrInfo = document.querySelector(
      '.order-addr div:last-child',
    ).innerText;

    // sellerId 이미 존재하는 지 확인하기 위한 set 객체 사용
    const encounterdSellers = new Set();

    const orderCreateData = postInfo.map((item) => {
      // 이전에 sellerId를 발견한 적이 있는지 확인
      const isFisrstSeller = !encounterdSellers.has(item.Post.sellerId);

      // sellerId가 처음 발생하는 경우 세트에 추가
      if (isFisrstSeller) {
        encounterdSellers.add(item.Post.sellerId);
      }

      // 맨처음의 sellerId에 대한 항목에만 배송비 추가
      const deliveryPrice = isFisrstSeller
        ? item.Post.Seller.Delivery.deliveryFee
        : 0;
      const itemObj = {
        postId: item.postId,
        cartId: item.cartId,
        sellerId: item.Post.sellerId,
        address: addrInfo,
        productPrice: item.Post.productPrice,
        deliveryPrice,
        totalPrice: item.Post.productPrice + deliveryPrice,
      };

      return itemObj;
    });

    console.log(orderCreateData);
    /*
     // 백엔드랑 연결 후 주석풀기
     try {
       const res = await axios.post('/orders', orderCreateData);
       if (res.status === 201) {
         navigate(`/order/complete${allOrderId}`);
       }
     } catch (err) {
       console.error(err);
     }
     
    */
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
                <div>배송지명&nbsp;</div>
                <div>{addressInfo.addName}&nbsp;</div>
              </div>
              <div className="order-addrReceiver">
                <div>받는 분&nbsp;</div>
                <div>{addressInfo.receiver}&nbsp;</div>
              </div>
              <div className="order-addrPhoneNum">
                <div>전화번호&nbsp;</div>
                <div>{addressInfo.phoneNum}&nbsp;</div>
              </div>
              <div className="order-addr">
                <div>주소&nbsp;</div>
                <div>
                  <span>{`(${addressInfo.zipCode}) ${addressInfo.address} ${addressInfo.detailedAddress}`}</span>
                </div>
              </div>
            </div>
          </section>
          {/* 4. 리블링머니 */}
          <section className="order-balanceInfo">
            <h2>리블링머니</h2>
            <div className="order-balanceBx">
              <div className="order-balanceInput">
                <input
                  type="number"
                  placeholder="0"
                  onChange={useBalance}
                  ref={balanceInputRef}
                />
                <button onClick={useAllBalance}>전액사용</button>
              </div>
              <div className="order-balance">
                <span>사용 가능 금액 </span>
                <span>{priceToString(orderData.userInfo.balance)}</span>
                <span> 원</span>
              </div>
              <div className="order-balanceComment"></div>
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
              <span></span>
            </div>
            <div className="order-paymentBtn">
              <Link to={'/order/complete/:orderId'} onClick={submitPayment}>
                결제하기
              </Link>
            </div>
          </section>
        </article>
      </div>
      {/* <DeliverySelect /> */}
    </div>
  );
}

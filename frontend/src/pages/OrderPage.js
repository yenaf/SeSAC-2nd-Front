import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentInfo from '../components/PaymentInfo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import priceToString from '../utils/priceMethods';
import SellerByOrder from '../components/SellerByOrder';
import '../styles/pages/OrderPage.scss';
import AddressSelect from '../components/AddressSelect';
import { sellerByOrder } from '../store/cartSliceTemp';
import { fetchAddList } from '../store/addressSlice';
import { postOrderData } from '../api/cart';
import { getAddressList } from '../api/address';
import { stopScroll } from '../utils/scroll';

// 결제 페이지
export default function OrderPage() {
  const {
    sellerByOrderData,
    orderTotalAmount,
    orderTotalDeliveryFee,
    orderTotalPayment,
  } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  const { userInfo, addressInfo, postInfo } = orderData;
  const [orderCheck, setOrderCheck] = useState('');
  const [balanceComment, setBalanceComment] = useState('');
  const balanceInputRef = useRef();
  const addressModelRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sellerByOrder(orderData));
  }, []);

  // 리블링 머니 사용
  const useBalance = (e) => {
    if (e.target.value > userInfo.balance) {
      setBalanceComment('잔액이 부족합니다.');
      return (e.target.value = '');
    }
    if (e.target.value < 1) {
      setBalanceComment('0이상 입력해주세요.');
      return (e.target.value = '');
    }
    setBalanceComment('');
  };

  // 전액 사용 버튼 클릭
  const useAllBalance = (e) => {
    const balanceInput = balanceInputRef.current;

    if (userInfo.balance < orderTotalPayment) {
      setBalanceComment('잔액이 부족합니다.');
      return;
    }
    balanceInput.value = orderTotalPayment;
    setBalanceComment('');
  };

  // 결제하기 버튼 클릭
  const submitPayment = async (e) => {
    e.preventDefault();

    const isOrderCheck = document.querySelector('#order-check');

    // 판매불가 상품 있는 지 확인
    postInfo.forEach((item) => {
      const { sellStatus } = item.Post;
      if (sellStatus !== '판매 중') {
        setOrderCheck('구매 불가 상품이 포함되어 있습니다.');
        return;
      }
    });

    // 결제 진행사항 동의 체크 여부 확인
    if (!isOrderCheck.checked) {
      setOrderCheck('결제 진행 필수사항을 동의해주세요.');
      return;
    }
    // 리블링 머니 잔액 확인
    const balanceInput = balanceInputRef.current;
    if (balanceInput.value < orderTotalPayment || !balanceInput.value) {
      setOrderCheck('리블링머니를 입력해주세요.');
      return;
    }

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
    try {
      const res = await postOrderData({ orderData: orderCreateData });
      if (res.status === 201) {
        const allOrderId = res.data.allOrderId;
        navigate(`/order/complete/${allOrderId}`);
      }
    } catch (err) {
      console.error(err);
      alert('결제할 수 없습니다');
    }
  };

  // 배송지 변경 버튼 클릭
  const changeAdress = async (e) => {
    const addressContainer = addressModelRef.current;
    addressContainer.style.display = 'block';
    stopScroll();
    try {
      const res = await getAddressList();
      if (res.status === 200) {
        dispatch(fetchAddList([...res.data]));
      }
    } catch (err) {
      console.error(err);
    }
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
              <button className="order-chgAddrBtn" onClick={changeAdress}>
                배송지 변경
              </button>
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
                  <span>{`(${addressInfo.zipCode}) ${addressInfo.address} ${addressInfo.detailedAddress ? addressInfo.detailedAddress : ''}`}</span>
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
              <div className="order-balanceComment">{balanceComment}</div>
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
              <span>{orderCheck}</span>
            </div>
            <div className="order-paymentBtn">
              <Link to={'/order/complete/:orderId'} onClick={submitPayment}>
                결제하기
              </Link>
            </div>
          </section>
        </article>
      </div>
      {/* 배송지 변경 컴포넌트 */}
      <div className="order-addressSelect" ref={addressModelRef}>
        <AddressSelect />
      </div>
    </div>
  );
}

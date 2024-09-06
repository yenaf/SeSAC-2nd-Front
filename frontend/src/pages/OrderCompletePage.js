import React, { useEffect, useState } from 'react';
import orderCompleteData from '../data/fakedata/orderCompleteData';
import priceToString from '../utils/priceMethods';
import axios from 'axios';
import '../styles/pages/OrderCompletePage.scss';
import { Link, useParams } from 'react-router-dom';
import { getOrderCompleteData } from '../api/cart';

// 결제 완료 페이지
export default function OrderCompletePage() {
  const [orderInfo, setOrderInfo] = useState({});
  const { allOrderId } = useParams();

  useEffect(() => {
    const orderInfos = async () => {
      try {
        const res = await getOrderCompleteData(allOrderId);
        // setOrderInfo(res.data);
        // setOrderInfo(orderCompleteData);
      } catch (err) {
        console.error(err);
      }
    };

    orderInfos();
  }, []);

  //setOrderInfo(orderCompleteData);
  // console.log(orderInfo);
  // 임시데이터
  // const orderInfo = orderCompleteData;

  return (
    <div className="orderComplete">
      <section>
        <h2>결제가 완료 되었습니다.</h2>
        <h3>
          주문번호 : <span>{orderInfo.allOrderId}</span>
        </h3>
        <ul>
          <li>
            <div>
              <span>주문상품&nbsp;</span>
            </div>
            <div>
              <span>{orderInfo.Post.postTitle}&nbsp;</span>
              <span>외&nbsp;</span>
              <span>{orderInfo.orderCount}건&nbsp;</span>
            </div>
          </li>
          <li>
            <div>배송지&nbsp;</div>
            <div>
              <span>{orderInfo.address}</span>
            </div>
          </li>
          <li>
            <div>결제금액&nbsp;</div>
            <div>{priceToString(orderInfo.price)}원&nbsp;</div>
          </li>
        </ul>
        <Link to={'/'}>홈으로 가기</Link>
      </section>
    </div>
  );
}

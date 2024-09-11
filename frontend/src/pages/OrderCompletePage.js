import React, { useEffect, useState } from 'react';
import priceToString from '../utils/priceMethods';
import '../styles/pages/OrderCompletePage.scss';
import { Link, useParams } from 'react-router-dom';
import { getOrderCompleteData } from '../api/cart';

// 결제 완료 페이지
export default function OrderCompletePage() {
  const { allOrderId } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const orderInfos = async () => {
      try {
        const res = await getOrderCompleteData(allOrderId);
        if (res.status === 200) {
          const orderData = res.data.orderDetails;
          setOrderInfo(orderData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    orderInfos();
  }, []);

  return (
    <div className="orderComplete">
      <section>
        <h2>결제가 완료 되었습니다.</h2>
        <h3>
          주문번호 : <span>{allOrderId}</span>
        </h3>
        {orderInfo && (
          <ul>
            <li>
              <div>
                <span>주문상품&nbsp;</span>
              </div>
              <div>
                <span>{orderInfo.orders[0].postTitle}&nbsp;</span>
                {orderInfo.orderCount > 1 && (
                  <>
                    <span>외&nbsp;</span>
                    <span>{orderInfo.orderCount}건&nbsp;</span>
                  </>
                )}
              </div>
            </li>
            <li>
              <div>배송지&nbsp;</div>
              <div>
                <span>{orderInfo.orders[0].address}</span>
              </div>
            </li>
            <li>
              <div>결제금액&nbsp;</div>
              <div>{priceToString(orderInfo.totalPaymentAmount)}원&nbsp;</div>
            </li>
          </ul>
        )}
        <Link to={'/'}>홈으로 가기</Link>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import MyPageMenu from '../components/MyPageMenu'; // 컴포넌트
import '../styles/pages/MyPage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  getOrderHistoryPageData,
  patchOrderHistoryConfirmData,
} from '../api/mypage';

export default function OrderHistoryPage() {
  const imgUrl = 'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/';
  const [orderData, setOrderData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getOrderHistoryApi();
  }, []);

  // 구매내역 조회 API
  const getOrderHistoryApi = async () => {
    try {
      const res = await getOrderHistoryPageData();
      if (res.status === 200) {
        const { orderHistory, orderHistoryMessage } = res.data;

        if (Array.isArray(orderHistory) && orderHistory.length > 0) {
          setOrderData(orderHistory);
        } else {
          setErrorMessage(orderHistoryMessage || '구매 내역이 없습니다.');
        }
      } else {
        setErrorMessage('구매 내역을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('Server Error:', error);
      setErrorMessage(
        error.response?.data?.error || '알 수 없는 오류가 발생했습니다.',
      );
    }
  };

  // 구매확정 API
  const orderBtn = async (orderId, postId) => {
    try {
      const res = await patchOrderHistoryConfirmData(orderId, postId);

      if (res.status === 200) {
        // 서버 업데이트 성공 시, 로컬 상태도 업데이트
        const updatedOrders = orderData.map((order) => {
          if (order.orderId === orderId) {
            alert('구매 확정이 성공적으로 처리되었습니다!');
            return {
              ...order,
              isConfirmed: true, // 로컬 상태에서 구매 확정 처리
            };
          }
          return order;
        });

        setOrderData(updatedOrders); // 상태 업데이트
      } else {
        setErrorMessage('구매 확정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Server Error:', error);
      setErrorMessage('구매 확정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container order-list">
          <div className="orderList-title">
            <h2>구매 내역</h2>
          </div>
          {errorMessage ? (
            <p className="err-msg">{errorMessage}</p>
          ) : orderData.length > 0 ? (
            <div className="order-list-container">
              <div id="order-list">
                {orderData.map((order, index) => (
                  <div key={index} className="order-list-content">
                    <Link to={`/posts/page/${order.Post.postId}`}>
                      <div className="order-list-content-title">
                        <h2>
                          <span className="txt-black">주문번호 : </span>
                          <span className="txt-main">{order.allOrderId}</span>
                        </h2>
                      </div>
                      <div className="order-list-content-box">
                        <div className="order-img">
                          <img
                            src={`${imgUrl}${order.Post.Product_Images[0].imgName}`}
                            alt="이미지"
                            className={
                              order.logStatus === '환불' ? 'refund' : ''
                            }
                          />
                        </div>
                        <div className="order-text">
                          <h2>
                            <span className="txt-black">상품명 :</span>{' '}
                            <span className="txt-main">
                              {order.Post.postTitle}
                            </span>
                          </h2>
                          <h2>
                            <span className="txt-black">가격 :</span>{' '}
                            <span className="txt-main">
                              {order.Post.productPrice.toLocaleString()} 원
                            </span>
                          </h2>
                          <h2>
                            <span className="txt-black">배송상태 :</span>{' '}
                            <span className="txt-main">
                              {order.deliveryStatus}
                            </span>
                          </h2>
                          <h2>
                            <span className="txt-black">송장번호 :</span>{' '}
                            <span className="txt-main">
                              {order.invoiceNumber || '배송 전 입니다.'}
                            </span>
                          </h2>

                          {/* 환불된 상품인 경우 메시지 표시 */}
                          {order.logStatus === '환불' && (
                            <p className="refund-msg">
                              상품이 환불 처리되었습니다. (신고 누적된 판매자)
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                    {/* 배송 상태가 "배송 완료"일 때만 버튼 또는 메시지 표시 */}
                    {order.deliveryStatus === '배송 완료' && (
                      <>
                        {/* 구매 확정되지 않은 경우 버튼 표시 */}
                        {!order.isConfirmed ? (
                          <div className="order-btn">
                            <button
                              onClick={() =>
                                orderBtn(order.orderId, order.Post.postId)
                              } // orderId와 postId 전달
                              id="order-btn"
                            >
                              구매확정하기
                            </button>
                          </div>
                        ) : (
                          <div className="order-btn">
                            <p className="order-msg">
                              이미 구매 확정되었습니다.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>구매 내역이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

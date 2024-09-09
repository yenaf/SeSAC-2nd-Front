import React, { useEffect, useState } from 'react';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';
import axios from 'axios';

export default function SellListPage() {
  const imgUrl = 'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/';

  const [sellData, setSellData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // 주문번호별로 데이터 묶어주는 함수
  const groupByOrder = (data) => {
    const groupByOrderData = data.reduce((acc, item) => {
      const allOrderId = item.allOrderId;
      if (!acc[allOrderId]) {
        acc[allOrderId] = [];
      }
      acc[allOrderId].push(item);
      return acc;
    }, {});

    return Object.keys(groupByOrderData).map((key) => ({
      allOrderId: parseInt(key, 10),
      items: groupByOrderData[key],
    }));
  };

  // 판매 내역 조회 API
  const getSellListApi = async () => {
    try {
      const res = await axios.get('http://localhost:8080/mypage/saleHistory', {
        withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
      });

      console.log('res.data >>', res.data); // 백엔드 응답 확인

      if (res.status === 200) {
        const { sellerOrders, sellerOrderMessage } = res.data;

        // sellerOrders 배열로 있는지 확인
        if (Array.isArray(sellerOrders) && sellerOrders.length > 0) {
          setSellData(groupByOrder(sellerOrders));
        } else {
          setErrorMessage(sellerOrderMessage || '판매 내역이 없습니다.');
        }
      } else {
        setErrorMessage('판매 내역을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('Server Error:', error);
      setErrorMessage(
        error.response?.data?.error || '알 수 없는 오류가 발생했습니다.',
      );
    }
  };

  // 컴포넌트가 마운트될 때 판매 내역 조회 API 호출
  useEffect(() => {
    getSellListApi();
  }, []);

  // 송장번호 등록 API
  const submitInvoiceNumber = async (e) => {
    e.preventDefault();
    const errMsg = e.target.parentNode.nextSibling;
    const numberPattern = /^[0-9]{12}$/;

    // 송장 번호 입력 확인
    if (invoiceNumber === '') {
      errMsg.innerText = '송장번호 입력하세요';
      return;
    } else if (!numberPattern.test(invoiceNumber)) {
      errMsg.innerText = '송장번호는 12자리의 숫자로 입력해주세요';
      return;
    }
    errMsg.innerText = '';

    const orderIds =
      e.target.parentNode.parentNode.parentNode.querySelectorAll(
        '.sell-list-orderId',
      );
    let orderArr = [];
    orderIds.forEach((val) => {
      orderArr.push(Number(val.value));
    });

    let data = {
      invoiceNumber: invoiceNumber, // 상태로 관리된 송장번호
      orderIds: orderArr,
    };

    try {
      const res = await axios.patch(
        'http://localhost:8080/mypage/invoiceNumber',
        data,
        {
          withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
        },
      );
      if (res.status === 200) {
        alert('송장번호 등록이 완료되었습니다!');
        setInvoiceNumber(''); // 송장번호 입력 필드 초기화
        getSellListApi(); // 송장번호 등록 후 새 데이터 가져오기
      } else {
        alert('송장번호 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.log('error.response >> ', error.response);
      if (error.response && error.response.data && error.response.data.error) {
        errMsg.innerText = error.response.data.error;
      } else {
        errMsg.innerText = '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
      }
    }
  };

  // API 응답 오니....?
  console.log(sellData);

  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container sell-list">
          <div className="sell-list-title">
            <h2>판매내역</h2>
          </div>
          {errorMessage ? (
            <p className="err-msg">{errorMessage}</p>
          ) : (
            <>
              {sellData.map((val, idx) => {
                console.log('deliveryStatus:', val.items[0]?.deliveryStatus); // '배송 전' 확인
                console.log('sellStatus:', val.items[0]?.Post?.sellStatus); // '판매 예약' 확인
                console.log(
                  'img:',
                  val.items[0].Post?.Product_Images[0].imgName,
                );

                return (
                  <div key={idx} className="sell-list-container">
                    <div id="sell-list">
                      <div className="sell-list-content">
                        <div className="sell-list-content-title">
                          <h2>주문번호 : {val.allOrderId}</h2>
                        </div>
                        {val.items.map((item, idx) => (
                          <div key={idx} className="sell-list-content-box">
                            <div className="sell-list-img">
                              <img
                                src={`${imgUrl}${item.Post?.Product_Images[0].imgName || '/img/duck.jpg'}`}
                                alt="상품 이미지"
                              />
                            </div>
                            <div className="sell-list-text">
                              <h2>
                                상품명 : {item.Post?.postTitle || '상품명 없음'}
                              </h2>
                              <h2>
                                가격 : {item.Post?.productPrice || '가격 없음'}
                              </h2>
                              <input
                                type="hidden"
                                value={item.orderId}
                                className="sell-list-orderId"
                              />
                            </div>
                          </div>
                        ))}
                        {val.items[0]?.deliveryStatus === '배송 중' ||
                        val.items[0]?.Post?.sellStatus === '판매 완료' ? (
                          // 송장번호 read-only (배송 중 또는 판매 완료일 때)
                          <form id="invoice-number-container" noValidate>
                            <h2 className="sell-status">
                              판매 상태 :
                              <span> {val.items[0]?.Post?.sellStatus}</span>
                            </h2>
                            <h2>송장번호</h2>
                            <div className="invoice-content">
                              <input
                                className="readonly-invoice"
                                type="text"
                                readOnly
                                value={val.items[0]?.invoiceNumber}
                              />
                            </div>
                          </form>
                        ) : (
                          // 송장번호 입력 가능 (배송 전 && 판매 예약일 때)
                          <form id="invoice-number-container" noValidate>
                            <h2 className="sell-status">
                              판매 상태 :
                              <span> {val.items[0]?.Post?.sellStatus}</span>
                            </h2>
                            <h2>송장번호 입력</h2>
                            <div className="invoice-content">
                              <input
                                type="text"
                                id="invoiceNumber"
                                value={invoiceNumber}
                                onChange={(e) =>
                                  setInvoiceNumber(e.target.value)
                                }
                              />
                              <button onClick={submitInvoiceNumber}>
                                저장
                              </button>
                            </div>
                            <span className="error-msg"></span>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

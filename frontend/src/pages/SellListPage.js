import React from 'react';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';
import { useForm } from 'react-hook-form';
import sellData from '../data/fakedata/sellData';
import axios from 'axios';

export default function SellListPage() {
  // API (판매 내역 조회)

  // API (송장번호 등록)
  const onSubmitApi = async (data) => {};

  // 주문번호별로 데이터 묶어주는 함수
  const groupByOrder = (data) => {
    // 주문번호별로 묶어서 객체
    const groupByOrderData = data.reduce((acc, item) => {
      // 현재 아이템의 allOrderId 가져오기
      const allOrderId = item.allOrderId;

      // allOrderId 없으면 새로운 배열 생성
      if (!acc[allOrderId]) {
        acc[allOrderId] = [];
      }

      // 해당 allOrderId에 맞는 배열에 아이템 추가
      acc[allOrderId].push(item);

      return acc;
    }, {});

    // allOrderId 데이터 객체를 배열로 만들기
    const orderByData = Object.keys(groupByOrderData).map((key) => ({
      allOrderId: parseInt(key, 10),
      items: groupByOrderData[key],
    }));

    return orderByData;
  };

  const sell = groupByOrder(sellData);
  console.log(sell);

  const submitInvoiceNumber = async (e) => {
    e.preventDefault();
    const invoiceValue = e.target.previousSibling.value.trim();
    const errMsg = e.target.parentNode.nextSibling;
    const numberPattern = /^[0-9]{12}$/;
    // errMsg
    if (invoiceValue === '') {
      errMsg.innerText = '송장번호 입력하세요';
      return;
    } else if (!numberPattern.test(invoiceValue)) {
      errMsg.innerText = '송장번호는 12자리의 숫자로 입력해주세요';
      return;
    }
    errMsg.innerText = '';
    console.log(e.target.parentNode.parentNode.parentNode);
    const orderIds =
      e.target.parentNode.parentNode.parentNode.querySelectorAll(
        '.sell-list-orderId',
      );
    let orderArr = [];
    orderIds.forEach((val) => {
      orderArr.push(Number(val.value));
    });

    let data = {
      invoiceNumber: invoiceValue,
      orderId: orderArr,
    };

    // API (송장번호 등록)
    try {
      const res = await axios.patch(
        'http://localhost:8080/mypage/invoiceNumber',
        data,
        {
          withCredentials: true, // 세션 및 쿠키 정보를 포함하여 요청
        },
      );
      // 응답 확인
      if (res.status === 200) {
        alert('송장번호 등록이 완료되었습니다!');
      } else {
        alert('송장번호 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.log('error.response >> ', error.response);
    }
  };

  return (
    <div className="mypage-container">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container sell-list">
          <div className="sell-list-title">
            <h2>판매내역</h2>
          </div>
          {sell && (
            <>
              {sell.map((val, idx) => (
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
                              src={item.Post.Product_Image[0].imgName}
                              alt="이미지임"
                            />
                          </div>
                          <div className="sell-list-text">
                            <h2>상품명 : {item.Post.postTitle}</h2>
                            <h2>가격 : {item.Post.productPrice}</h2>
                            <input
                              type="hidden"
                              value={item.orderId}
                              className="sell-list-orderId"
                            />
                          </div>
                        </div>
                      ))}
                      {val.items[0].deliveryStatus === '배송 전' &&
                      val.items[0].Post.sellStatus === '판매 예약' ? (
                        <form id="invoice-number-container">
                          <h2 className="sell-status">
                            판매 상태 :
                            <span> {val.items[0].Post.sellStatus}</span>
                          </h2>
                          <h2>송장번호 입력</h2>
                          <div className="invoice-content">
                            <input type="text" id="invoiceNumber" />
                            <button onClick={submitInvoiceNumber}>저장</button>
                          </div>
                          <span className="error-msg"></span>
                        </form>
                      ) : (
                        <form id="invoice-number-container">
                          <h2 className="sell-status">
                            판매 상태 :
                            <span> {val.items[0].Post.sellStatus}</span>
                          </h2>
                          <h2>송장번호</h2>
                          <div className="invoice-content">
                            <input
                              className="readonly-invoice"
                              type="text"
                              readOnly
                              value={val.items[0].invoiceNumber}
                            />
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 구매테이블의 배송상태와 판매글테이블의 판매상태 받아오기
// 판매테이블의 판매상태가 판매예약이고
// 구매테이블의 배송상태가 배송전일 때 송장번호 입력이 뜬다.

// 판매테이블의 판매상태가 판매완료일때는 송장번호 입력 안되고 번호만 떠야함.
// 배송중일 때 송장번호 입력 하면 안됨.

// 주문번호 문자 + 숫자 10자리
// 송장번호 숫자 12자리

// 주문번호 같은 애들은 묶기

/////////////////////////////////

// 배송전, 판매예약 -> 송장번호 입력
// 배송중, 판매완료 -> 입력된 송장번호 보여주고, 리드온리

import React from 'react';
import priceToString from '../utils/priceMethods';

export default function PaymentInfo({ pageInfo, price }) {
  const { totalAmount, totalDeliveryFee, totalPayment } = price;
  return (
    <>
      <div className={`${pageInfo}-totalAmount`}>
        <span>총 상품금액</span>
        <span>{priceToString(totalAmount)}원</span>
      </div>
      <div className={`${pageInfo}-totalDevelivetyFee`}>
        <span>총 배송비</span>
        <span>+{priceToString(totalDeliveryFee)}원</span>
      </div>
      <div className={`${pageInfo}-payment`}>
        <span>결제금액</span>
        <span>{priceToString(totalPayment)}원</span>
      </div>
    </>
  );
}

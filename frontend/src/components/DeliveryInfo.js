import React from 'react';

export default function DeliveryInfo({ infos }) {
  return (
    <li className="delivery-info">
      <div className="delivery-title">
        <h3 className="delivery-name">{infos.addName}</h3>
        {infos.isDefault ? <span>기본배송지</span> : null}
      </div>
      <div className="delivery-address">
        <span>{`(${infos.zipCode}) ${infos.address} ${infos.detailedAddress}`}</span>
      </div>
      <div className="delivery-receiver">
        <span>{infos.receiver}</span>
        <span>{infos.phoneNum}</span>
      </div>
      <div className="delivery-btns">
        <button>삭제</button>
        <button>수정</button>
        <button>선택</button>
      </div>
    </li>
  );
}

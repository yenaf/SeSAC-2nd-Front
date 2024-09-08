import React from 'react';

export default function DeliveryInfo({ infos }) {
  return (
    <li className="delivery-info">
      <div className="delivery-addName">
        <h3 className="delivery-name">
          {infos.addName}
          {infos.isDefault ? (
            <span className="delivery-default">기본배송지</span>
          ) : null}
        </h3>
      </div>
      <div className="delivery-address">
        <span>{`(${infos.zipCode}) ${infos.address} ${infos.detailedAddress}`}</span>
      </div>
      <div className="delivery-receiver">
        <span>{infos.receiver}</span>
        <span>{infos.phoneNum}</span>
      </div>
      <div className="delivery-btns">
        <button>수정</button>
        <button>삭제</button>
        <button>선택</button>
      </div>
    </li>
  );
}

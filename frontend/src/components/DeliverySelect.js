import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import deliveryData from '../data/fakedata/deliveryData';
import DeliveryInfo from './DeliveryInfo';

export default function DeliverySelect() {
  return (
    <div className="delivery-container">
      <div className="delivery-bx">
        <div className="delivery-title">
          <h2>배송지 선택</h2>
          <button>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <ul>
          {deliveryData.map((data) => (
            <DeliveryInfo infos={data} key={data.addId} />
          ))}
        </ul>
      </div>
    </div>
  );
}

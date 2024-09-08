import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
//import deliveryData from '../data/fakedata/deliveryData';
import DeliveryInfo from './DeliveryInfo';
import DeliveryInput from './DeliveryInput';

export default function DeliverySelect({ address }) {
  const modalRef = useRef();
  const deliveryData = address;
  const [add, setAdd] = useState(false);
  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  const addAddress = async () => {
    setAdd(true);
    if (add) {
      console.log('dd');
    }
  };

  console.log(add);

  return (
    <div className="delivery-container" ref={modalRef}>
      <div className="delivery-bx">
        <div className="delivery-title">
          <h2>{add ? '배송지 추가' : '배송지 선택'}</h2>
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <ul className="delivery-list">
          {add ? (
            <DeliveryInput />
          ) : (
            deliveryData.map((data) => (
              <DeliveryInfo infos={data} key={data.addId} />
            ))
          )}
        </ul>
        <div className="delivery-add">
          <button onClick={addAddress}>배송지 추가</button>
        </div>
      </div>
    </div>
  );
}

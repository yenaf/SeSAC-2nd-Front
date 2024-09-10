import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AddressInfo from './AddressInfo';
import AddressInput from './AddressInput';
import { useSelector } from 'react-redux';

export default function AddressSelect() {
  const { addressList } = useSelector((state) => state.address);

  const [add, setAdd] = useState(false);
  const closeModal = (e) => {
    const orderSelectBox =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(
        '.order-addressSelect',
      );

    if (orderSelectBox) {
      orderSelectBox.style.display = 'none';
    }
  };

  const addAddress = () => {
    setAdd(true);
  };

  const cancelAdd = () => {
    setAdd(false);
  };

  const addRegisterDone = () => {
    setAdd(false);
  };

  console.log(add);
  return (
    <div className="address-container">
      <div className="address-bx">
        <div className="address-title">
          {add ? (
            <button onClick={cancelAdd} className="add-cancel">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          ) : (
            ''
          )}
          <h2>{add ? '배송지 추가' : '배송지 선택'}</h2>
          <button onClick={closeModal} className="close-modal">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <ul className="address-list">
          {add ? (
            <AddressInput add={addRegisterDone} />
          ) : (
            addressList.map((data) => (
              <AddressInfo
                infos={data}
                key={data.addId}
                add={addRegisterDone}
              />
            ))
          )}
        </ul>
        <div className="address-add">
          {add ? '' : <button onClick={addAddress}>배송지 추가</button>}
        </div>
      </div>
    </div>
  );
}

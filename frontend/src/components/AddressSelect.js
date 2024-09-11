import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AddressInfo from './AddressInfo';
import AddressInput from './AddressInput';
import { useSelector, useDispatch } from 'react-redux';
import { readAddr } from '../store/addressSlice';
import { goScroll } from '../utils/scroll';

// 전체 배송지 선택 컴포넌트
export default function AddressSelect() {
  const { addressList } = useSelector((state) => state.address);

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const closeModal = (e) => {
    goScroll();
    const orderSelectBox =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(
        '.order-addressSelect',
      );

    if (orderSelectBox) {
      orderSelectBox.style.display = 'none';
      setAdd(false);
      setEdit(false);
    }
  };

  const addAddress = () => {
    setAdd(true);
    setEdit(false);
    dispatch(readAddr({}));
  };

  const cancelAdd = () => {
    setAdd(false);
  };

  const addRegisterDone = () => {
    setAdd(false);
    setEdit(false);
  };

  const editAddress = () => {
    setEdit(true);
    setAdd(true);
  };

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
          <h2>
            {add ? (edit ? '배송지 수정' : '배송지 추가') : '배송지 선택'}
          </h2>
          <button onClick={closeModal} className="close-modal">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <ul className="address-list">
          {add ? (
            edit ? (
              <AddressInput addDone={addRegisterDone} status={'edit'} />
            ) : (
              <AddressInput addDone={addRegisterDone} status={'add'} />
            )
          ) : (
            addressList.map((data) => (
              <AddressInfo
                infos={data}
                key={data.addId}
                add={addRegisterDone}
                edit={editAddress}
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

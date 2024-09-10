import React from 'react';
import { deleteAddress, getAddressList } from '../api/address';
import { useDispatch } from 'react-redux';
import { fetchAddList } from '../store/addressSlice';

export default function AddressInfo({ infos, add }) {
  const {
    addName,
    zipCode,
    address,
    detailedAddress,
    phoneNum,
    receiver,
    addId,
  } = infos;
  const dispatch = useDispatch();

  // 배송지 정보 수정
  const modifyAddress = () => {};
  // 배송지 삭제
  const delAddress = async (e) => {
    if (confirm('주소지를 삭제하시겠습니까?')) {
      try {
        const res = await deleteAddress(addId);
        if (res.data.true) {
          const addRes = await getAddressList();
          dispatch(fetchAddList([...addRes.data]));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // 배송지 선택
  const selectAddress = () => {
    const orderInfo = document.querySelector('.order-addrInfoBx');
    if (orderInfo) {
      const orderAddrBx = document.querySelector('.order-addressSelect');
      const addrName = orderInfo.querySelector(
        '.order-addrName div:last-child',
      );
      const addrReceiver = orderInfo.querySelector(
        '.order-addrReceiver div:last-child',
      );
      const addrPhoneNum = orderInfo.querySelector(
        '.order-addrPhoneNum div:last-child',
      );
      const addr = orderInfo.querySelector('.order-addr div:last-child span');

      addrName.innerText = `${addName} `;
      addrReceiver.innerText = `${receiver} `;
      addrPhoneNum.innerText = `${phoneNum} `;
      addr.innerText = `(${zipCode}) ${address} ${detailedAddress}`;
      orderAddrBx.style.display = 'none';
    }
  };

  return (
    <li className="address-info">
      <div className="address-addName">
        <h3 className="address-name">
          {infos.addName}
          {infos.isDefault ? (
            <span className="address-default">기본배송지</span>
          ) : null}
        </h3>
      </div>
      <div className="address-address">
        <span>{`(${infos.zipCode}) ${infos.address} ${infos.detailedAddress ? infos.detailedAddress : ''}`}</span>
      </div>
      <div className="address-receiver">
        <span>{infos.receiver}</span>
        <span>{infos.phoneNum}</span>
      </div>
      <div className="address-btns">
        <button onClick={modifyAddress}>수정</button>
        <button onClick={delAddress}>삭제</button>
        <button onClick={selectAddress}>선택</button>
      </div>
    </li>
  );
}

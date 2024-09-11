import React from 'react';
import { AddressInput } from './Register';
import { useForm } from 'react-hook-form';
import { insertAddress, getAddressList, updateAddress } from '../api/address';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddList } from '../store/addressSlice';

// 배송지 입력 컴포넌트
export default function AddressInfo({ addDone, status }) {
  const { addrValue } = useSelector((state) => state.address);
  console.log(addrValue);

  const {
    addName,
    zipCode,
    address,
    detailedAddress,
    isDefault,
    phoneNum,
    receiver,
    addId,
  } = addrValue;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      addName: addName || '',
      receiver: receiver || '',
      phoneNum: phoneNum || '',
      zipCode: zipCode || '',
      address: address || '',
      detailedAddress: detailedAddress || '',
      isDefault: isDefault || false,
    },
  });

  const dispatch = useDispatch();

  const registerAddress = async (data) => {
    try {
      if (status === 'add') {
        const res = await insertAddress(data);
        if (res.status === 200) {
          alert('배송지가 저장되었습니다.');
          const addRes = await getAddressList();
          dispatch(fetchAddList([...addRes.data]));
        }
      } else if (status === 'edit') {
        const res = await updateAddress(addId, data);
        if (res.data.result) {
          alert('배송지가 수정되었습니다.');
          const addRes = await getAddressList();
          dispatch(fetchAddList([...addRes.data]));
        }
      }
      addDone();
    } catch (err) {
      console.error(err);
    }
  };
  const onInValid = (err) => {
    console.log('onInValid >> ', err);
  };

  return (
    <div className="address-insert">
      <form onSubmit={handleSubmit(registerAddress, onInValid)}>
        <div className="address-addNameInput">
          <label htmlFor="addName">배송지명</label>
          <input
            type="text"
            id="addName"
            name="addName"
            {...register('addName', {
              required: '배송지명을 입력해주세요',
              pattern: {
                message: '배송지명은 한글 2-6자 사이여야 합니다.',
                value: /^[가-힣]{2,6}$/,
              },
            })}
          />
          <span className="error-msg">{errors.addName?.message}</span>
        </div>
        <div className="address-receiverInput">
          <label htmlFor="receiver">받는 사람</label>
          <input
            type="text"
            id="receiver"
            name="receiver"
            {...register('receiver', {
              required: '받는 사람을 입력해주세요',
              pattern: {
                message: '이름은 한글 2-6자 사이여야 합니다.',
                value: /^[가-힣]{2,6}$/,
              },
            })}
          />
          <span className="error-msg">{errors.receiver?.message}</span>
        </div>
        <div className="address-phoneInput">
          <label htmlFor="phoneNum">전화번호</label>
          <input
            type="text"
            id="phoneNum"
            name="phoneNum"
            {...register('phoneNum', {
              required: '휴대전화번호를 입력해주세요!',
              pattern: {
                message:
                  '휴대전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다.',
                value: /^[0-9]{10,11}$/,
              },
            })}
          />
          <span className="error-msg">{errors.phoneNum?.message}</span>
        </div>
        <AddressInput register={register} setValue={setValue} errors={errors} />
        <div className="address-isDefault">
          <input
            type="checkbox"
            id="isDefault"
            name="isDefault"
            {...register('isDefault')}
          />
          <label htmlFor="isDefault" value={isDefault}>
            기본 배송지로 저장
          </label>
        </div>
        <button className="address-save">배송지 저장</button>
      </form>
    </div>
  );
}

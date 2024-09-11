import React, { useEffect } from 'react';
import MyPageMenu from '../components/MyPageMenu';
import '../styles/pages/MyPage.scss';
import '../styles/pages/MypageAddress.scss';
import AddressSelect from '../components/AddressSelect';
import { getAddressList } from '../api/address';
import { useDispatch } from 'react-redux';
import { fetchAddList } from '../store/addressSlice';

export default function AddressPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAddress();
  }, []);
  const fetchAddress = async () => {
    try {
      const res = await getAddressList();
      if (res.status === 200) {
        dispatch(fetchAddList([...res.data]));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mypage-container mypage-container-address">
      <MyPageMenu />
      <div className="mypage-info-container">
        <div className="mypage-content-container">
          <div className="mypage-addressContent">
            <AddressSelect />
          </div>
        </div>
      </div>
    </div>
  );
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// 임시 장바구니 데이터
import cartData from '../data/fakedata/cartData';

// 판매자별로 데이터 묶기
const groupBySellerData = cartData.reduce((acc, item) => {
  // 현재 아이템의 sellerId 가져오기
  const sellerId = item.Post.sellerId;

  // sellerId 없으면 새로운 배열 생성
  if (!acc[sellerId]) {
    acc[sellerId] = [];
  }

  // 해당 sellerId에 맞는 배열에 아이템 추가
  acc[sellerId].push(item);

  return acc;
}, {});

// 객체를 배열로 만들기
const sellerByCartData = Object.keys(groupBySellerData).map((key) => ({
  sellerId: parseInt(key, 10),
  items: groupBySellerData[key],
}));
// createAsyncThunk -> 비동기 연결 후 사용 예정

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartData: sellerByCartData },
  reducers: {},
});

// export const { groupBySeller } = cartSlice.actions;

export default cartSlice.reducer;

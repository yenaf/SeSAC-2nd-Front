import { createSlice } from '@reduxjs/toolkit';
// 임시 장바구니 데이터
import cartData from '../data/fakedata/cartData';
// 임시 결제페이지 데이터
import orderData from '../data/fakedata/orderData';

class GroupBySellerData {
  constructor(data) {}
  sellerByData() {}
}

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

// 아이템 가격 합계
const totalAmount = sellerByCartData.reduce((acc, cur) => {
  return (
    acc +
    cur.items.reduce((total, item) => {
      return total + item.Post.productPrice;
    }, 0)
  );
}, 0);
// 배송비 가격 합계
const totalDeliveryFee = sellerByCartData.reduce((acc, cur) => {
  const firstItem = cur.items[0];
  const deliveryFee = firstItem.Post.Seller.Delivery.deliveryFee || 0;
  return acc + deliveryFee;
}, 0);
// 결제 금액
const totalPayment = totalAmount + totalDeliveryFee;

// createAsyncThunk -> 비동기 연결 후 사용 예정

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: sellerByCartData,
    totalAmount,
    totalDeliveryFee,
    totalPayment: totalAmount + totalDeliveryFee,
  },
  reducers: {
    totalZero: (state, action) => {
      state.totalAmount = 0;
      state.totalDeliveryFee = 0;
      state.totalPayment = 0;
    },
    totalPrice: (state, action) => {
      // 업데이트된 totalAmount와 totalDeliveryFee 계산
      const updatedAmount = state.cartData.reduce((acc, seller) => {
        return (
          acc +
          seller.items.reduce((total, item) => {
            return total + item.Post.productPrice;
          }, 0)
        );
      }, 0);

      const updatedDeliveryFee = state.cartData.reduce((acc, seller) => {
        const firstItem = seller.items[0];
        const deliveryFee = firstItem
          ? firstItem.Post.Seller.Delivery.deliveryFee
          : 0;
        return acc + deliveryFee;
      }, 0);

      // 업데이트된 totalPayment 계산
      state.totalAmount = updatedAmount;
      state.totalDeliveryFee = updatedDeliveryFee;
      state.totalPayment = updatedAmount + updatedDeliveryFee;
    },
    deleteEachPrice: (state, action) => {
      state.totalAmount -= Number(action.payload.price);
      state.totalDeliveryFee -= Number(action.payload.deliveryFee);
      state.totalPayment = state.totalAmount + state.totalDeliveryFee;
    },
    addEachPrice: (state, action) => {
      state.totalAmount += Number(action.payload.price);
      state.totalDeliveryFee += Number(action.payload.deliveryFee);
      state.totalPayment = state.totalAmount + state.totalDeliveryFee;
    },
    deleteItem: (state, action) => {
      const targetIds = Array.isArray(action.payload)
        ? action.payload
        : [Number(action.payload)];

      // cartData에서 targetIds와 일치하지 않는 아이템만 남기기
      state.cartData = state.cartData.map((seller) => ({
        ...seller,
        items: seller.items.filter((item) => !targetIds.includes(item.cartId)),
      }));
      // 업데이트된 totalAmount와 totalDeliveryFee 계산
      const updatedAmount = state.cartData.reduce((acc, seller) => {
        return (
          acc +
          seller.items.reduce((total, item) => {
            return total + item.Post.productPrice;
          }, 0)
        );
      }, 0);

      const updatedDeliveryFee = state.cartData.reduce((acc, seller) => {
        const firstItem = seller.items[0];
        const deliveryFee = firstItem
          ? firstItem.Post.Seller.Delivery.deliveryFee
          : 0;
        return acc + deliveryFee;
      }, 0);

      // 업데이트된 totalPayment 계산
      state.totalAmount = updatedAmount;
      state.totalDeliveryFee = updatedDeliveryFee;
      state.totalPayment = updatedAmount + updatedDeliveryFee;
    },
  },
});

export const {
  totalZero,
  totalPrice,
  deleteEachPrice,
  addEachPrice,
  deleteItem,
} = cartSlice.actions;

export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// 임시 장바구니 데이터
import cartData from '../data/fakedata/cartData';
// 임시 결제페이지 데이터
import orderData from '../data/fakedata/orderData';
import axios from 'axios';
import { getCartData, getOrderData } from '../api/cart';

// 임시 여기서 실험할거임

// 판매자별로 데이터 묶어주는 함수
function groupBySeller(data) {
  // 판매자별로 묶어서 객체
  const groupBySellerData = data.reduce((acc, item) => {
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

  // 카트 데이터 객체를 배열로 만들기
  const sellerByCartData = Object.keys(groupBySellerData).map((key) => ({
    sellerId: parseInt(key, 10),
    items: groupBySellerData[key],
  }));

  return sellerByCartData;
}

const groupBySellerCart = groupBySeller(cartData);
const groupBySellerOrder = groupBySeller(orderData.postInfo);

export const loadCart = createAsyncThunk(
  // action 이름
  'load/cart',
  // 처리할 비동기 함수
  async () => {
    // 서버에서 데이터 불러오기
    const res = await getCartData();
    return res.data;
  },
);

export const loadOrder = createAsyncThunk('load/order', async () => {
  const res = await getOrderData();
  return res.data;
});

// 아이템 가격 합계 함수
const sumAmount = (data) => {
  return data.reduce((acc, cur) => {
    return (
      acc +
      cur.items.reduce((total, item) => {
        // 판매 중 상태의 상품만 합산
        if (item.Post.sellStatus === '판매 중') {
          return total + item.Post.productPrice;
        }
        return total;
      }, 0)
    );
  }, 0);
};

// 배송비 합계 함수
const sumDeliveryFee = (data) => {
  return data.reduce((acc, cur) => {
    const hasSellingItems = cur.items.some(
      (item) => item.Post.sellStatus === '판매 중',
    );
    if (hasSellingItems) {
      // const firstItem = cur.items[0];
      const firstItem = cur.items.find(
        (item) => item.Post.sellStatus === '판매 중',
      );
      const deliveryFee = firstItem.Post.Seller.Delivery.deliveryFee || 0;
      return acc + deliveryFee;
    }
    return acc;
  }, 0);
};

// 카트 아이템 가격 합계
const totalAmount = sumAmount(groupBySellerCart);
// 카트 배송비 가격 합계
const totalDeliveryFee = sumDeliveryFee(groupBySellerCart);
// 오더 아이템 가격 합계
const orderTotalAmount = sumAmount(groupBySellerOrder);
// 오더 배송비 가격 합계
const orderTotalDeliveryFee = sumDeliveryFee(groupBySellerOrder);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // cartData: groupBySellerCart,
    // sellerByOrderData: groupBySellerOrder,
    // totalAmount,
    // totalDeliveryFee,
    // totalPayment: totalAmount + totalDeliveryFee,
    // orderTotalAmount,
    // orderTotalDeliveryFee,
    // orderTotalPayment: orderTotalAmount + orderTotalDeliveryFee,
    cartData: [],
    sellerByOrderData: [],
    orderData: [],
    totalAmount: 0,
    totalDeliveryFee: 0,
    totalPayment: 0,
    orderTotalAmount: 0,
    orderTotalDeliveryFee: 0,
    orderTotalPayment: 0,
    loading: 0,
    error: null,
  },
  reducers: {
    totalZero: (state, action) => {
      state.totalAmount = 0;
      state.totalDeliveryFee = 0;
      state.totalPayment = 0;
    },
    totalPrice: (state, action) => {
      // 업데이트된 totalAmount와 totalDeliveryFee 계산
      const updatedAmount = sumAmount(state.cartData);

      const updatedDeliveryFee = sumDeliveryFee(state.cartData);

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
      const updatedAmount = sumAmount(state.cartData);
      const updatedDeliveryFee = sumDeliveryFee(state.cartData);

      // 업데이트된 totalPayment 계산
      state.totalAmount = updatedAmount;
      state.totalDeliveryFee = updatedDeliveryFee;
      state.totalPayment = updatedAmount + updatedDeliveryFee;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        // 요청 성공
        state.loading = true;
        state.cartData = groupBySeller(action.payload);
        state.totalAmount = sumAmount(state.cartData);
        state.totalDeliveryFee = sumDeliveryFee(state.cartData);
        state.totalPayment = state.totalAmount + state.totalDeliveryFee;
      })
      .addCase(loadCart.rejected, (state, action) => {
        // 요청 실패
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadOrder.pending, (state, action) => {
        state.loading = true;
        state.orderData = action.payload;
        const grouporderData = groupBySeller(action.payload);
        state.sellerByOrderData = grouporderData;
        state.orderTotalAmount = sumAmount(state.sellerByOrderData);
        state.orderTotalDeliveryFee = sumDeliveryFee(state.sellerByOrderData);
        state.orderTotalPayment =
          state.orderTotalAmount + state.orderTotalDeliveryFee;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.loading = true;
        state.sellerByOrderData = groupBySeller(action.payload);
      });
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
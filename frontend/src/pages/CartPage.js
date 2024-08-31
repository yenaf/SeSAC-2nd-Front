import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cartData from '../data/fakedata/cartData';
import '../styles/pages/CartPage.scss';
import Cart from '../components/Cart';
import CartEmpty from '../components/CartEmpty';

// 장바구니 페이지
export default function CartPage() {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // cartData => 나중에 백엔드와 엮을때 이 이름으로 가져오기
    // 판매자별로 아이템 묶기
    const groupedBySeller = cartData.reduce((acc, item) => {
      // 현재 아이템의 sellerId를 가져오기
      const sellerId = item.Post.sellerId;

      // sellerId가 없으면 새로운 배열을 생성
      if (!acc[sellerId]) {
        acc[sellerId] = [];
      }

      // 해당 sellerId에 맞는 배열에 아이템을 추가
      acc[sellerId].push(item);

      return acc;
    }, {});

    // 결과를 배열로 변환
    const sellerByCartData = Object.keys(groupedBySeller).map((key) => ({
      sellerId: parseInt(key, 10),
      items: groupedBySeller[key],
    }));

    setCart(sellerByCartData);
  }, []);

  return (
    <div className="cart">
      {cart.length > 0 ? <Cart cart={cart} /> : <CartEmpty />}
    </div>
  );
}

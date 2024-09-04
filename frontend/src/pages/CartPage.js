import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cartData from '../data/fakedata/cartData';
import '../styles/pages/CartPage.scss';
import Cart from '../components/Cart';
import CartEmpty from '../components/CartEmpty';

// 장바구니 페이지
export default function CartPage() {
  const { userId } = useParams();
  // const [cart, setCart] = useState([]);
  const cart = useSelector((state) => state.cart.cartData);

  useEffect(() => {}, []);

  return (
    <>
      <h2 className="cart-title">장바구니</h2>
      <div className="cart">{cart.length > 0 ? <Cart /> : <CartEmpty />}</div>
    </>
  );
}

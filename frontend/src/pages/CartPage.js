import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/pages/CartPage.scss';
import Cart from '../components/Cart';
import CartEmpty from '../components/CartEmpty';
import { loadCart } from '../store/cartSliceTemp';

// 장바구니 페이지
export default function CartPage() {
  const cart = useSelector((state) => state.cart.cartData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
  }, []);

  return (
    <>
      <h2 className="cart-title">장바구니</h2>
      <div className="cart">{cart.length > 0 ? <Cart /> : <CartEmpty />}</div>
    </>
  );
}

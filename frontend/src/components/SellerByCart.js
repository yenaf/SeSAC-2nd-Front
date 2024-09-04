import React, { useRef } from 'react';
import priceToString from '../utils/priceMethods';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteEachPrice, addEachPrice, deleteItem } from '../store/cartSlice';

export default function SellerByCart({ cart, forwardRef, handleCheckEach }) {
  const { items } = cart;
  const dispatch = useDispatch();

  if (!items || items.length === 0) {
    // items가 없거나 비어있을 때 아무 것도 렌더링하지 않음
    return null;
  }

  const checkItem = (e, idx) => {
    handleCheckEach(e);

    const parentEle = e.target.parentNode.parentNode.parentNode;
    const checkedEleNum = parentEle.querySelectorAll(
      '.cartItem-check input:checked',
    ).length;

    // 체크 여부에 따른 최종 결제 금액 변경
    const price = items[idx].Post.productPrice;
    const deliveryFee = items[idx].Post.Seller.Delivery.deliveryFee;
    if (e.target.checked) {
      if (checkedEleNum > 0 && checkedEleNum <= 1) {
        dispatch(addEachPrice({ price, deliveryFee }));
      } else {
        dispatch(addEachPrice({ price, deliveryFee: 0 }));
      }
    } else {
      if (checkedEleNum > 0) {
        dispatch(deleteEachPrice({ price, deliveryFee: 0 }));
      } else {
        dispatch(deleteEachPrice({ price, deliveryFee }));
      }
    }
  };

  // 장바구니 아이템 삭제
  const deleteCartItem = (e, targetId) => {
    dispatch(deleteItem(targetId));
  };

  return (
    <li className="cart-itemList">
      {items && (
        <>
          {/* 판매자 정보 */}
          <h3 className="cart-seller">
            <span>판매자</span>
            <span>{items[0].Post.Seller.sellerName}</span>
          </h3>
          {/* 아이템 리스트 */}
          <ol>
            {items.map((val, idx) => (
              <li key={val.postId} className="cartItem">
                <div className="cartItem-check">
                  <input
                    type="checkbox"
                    defaultChecked
                    ref={(el) => (forwardRef.current[idx] = el)}
                    onChange={(e) => checkItem(e, idx)}
                    data-cart={`${val.cartId}`}
                  />
                </div>
                <figure className="cartItem-img">
                  <img
                    src={val.Post.Product_Image[0].imgName}
                    alt={val.Post.postTitle}
                  />
                </figure>
                <div className="cartItem-info">
                  <h5 className="cartItem-category">
                    {val.Post.Category.categoryName}
                  </h5>
                  <h4 className="cartItem-title">{val.Post.postTitle}</h4>
                  <div className="cartItem-state">
                    <span className="cartItem-type">
                      {val.Post.productType}
                    </span>{' '}
                    /&nbsp;
                    <span className="cartItem-status">
                      {val.Post.productStatus}
                    </span>
                  </div>
                  <div className="cartItem-price">
                    가격 : {priceToString(val.Post.productPrice)}원
                  </div>
                </div>
                <div className="cartItem-deleteBtn">
                  <button onClick={(e) => deleteCartItem(e, val.cartId)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </li>
            ))}
          </ol>
          {/* 배송비 */}
          <p className="cart-deliveryFee">
            배송비 :&nbsp;
            <span>
              {priceToString(items[0].Post.Seller.Delivery.deliveryFee)}원 &#40;
              {items[0].Post.Seller.Delivery.deliveryName}&#41;
            </span>
          </p>
        </>
      )}
    </li>
  );
}

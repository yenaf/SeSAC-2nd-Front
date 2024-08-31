import React from 'react';
import priceToString from '../utils/priceMethods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SellerByCart({ cart }) {
  const { items } = cart;
  console.log(cart);

  return (
    <li className="cart-itemList">
      {/* 판매자 정보 */}
      <h3 className="cart-seller">
        <span>판매자</span>
        <span>{items[0].Post.Seller.sellerName}</span>
      </h3>
      {/* 아이템 리스트 */}
      <ol>
        {items.map((val, idx) => (
          <li key={idx} className="cartItem">
            <div className="cartItem-check">
              <input type="checkbox" />
            </div>
            <figure className="cartItem-img">
              <img src={val.Post.Product_Image.imgName} />
            </figure>
            <div className="cartItem-info">
              <h5 className="cartItem-category">
                {val.Post.Category.categoryName}
              </h5>
              <h4 className="cartItem-title">{val.Post.postTitle}</h4>
              <div className="cartItem-state">
                <span className="cartItem-type">{val.Post.productType}</span>{' '}
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
              <button>
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
    </li>
  );
}

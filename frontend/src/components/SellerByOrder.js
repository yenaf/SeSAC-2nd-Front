import React from 'react';
import priceToString from '../utils/priceMethods';

export default function SellerByOrder({ order }) {
  const { items } = order;
  return (
    <>
      {/* 판매자정보 */}
      <h3 className="order-seller">
        <div className="seller-info">
          <span className="seller-name">{items[0].Post.Seller.sellerName}</span>{' '}
          /&nbsp;
          <span className="seller-deliveryFee">
            배송비 :{' '}
            {`${priceToString(items[0].Post.Seller.Delivery.deliveryFee)}원(${items[0].Post.Seller.Delivery.deliveryName})`}
          </span>
        </div>
      </h3>
      {/* 아이템 리스트 -> map 써서 아이템 별로 묶어서 반복, 장바구니 페이지처럼 */}
      <ol>
        {items.map((val, idx) => (
          <li key={idx}>
            <figure className="orderItem-img">
              <img
                src={val.Post.Product_Image[0].imgName}
                alt={val.Post.postTitle}
              />
            </figure>
            <div className="orderItem-info">
              <h5 className="orderItem-category">
                {val.Post.Category.categoryName}
              </h5>
              <h4 className="orderItem-title">{val.Post.postTitle}</h4>
              <div className="orderItem-state">
                <span className="orderItme-type">{val.Post.productType} </span>
                /&nbsp;
                <span className="orderItme-status">
                  {val.Post.productStatus}
                </span>
              </div>
              <div className="orderItem-price">
                {priceToString(val.Post.productPrice)}원
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

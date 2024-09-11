import React from 'react';
import priceToString from '../utils/priceMethods';
import elapsedTime from '../utils/elapsedTime';
import { Link } from 'react-router-dom';

export default function ItemList({ item }) {
  const imgUrl = 'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/';
  return (
    <li className="list-item">
      <Link to={`/posts/page/${item.postId}` || `/posts/page/${item.postId}`}>
        <figure className="item-img">
          <img
            src={
              `${imgUrl}${item.Product_Images[0].imgName}` ||
              item.Product_Images[0].imgName
            }
            alt={item.postTitle}
          />
          {item.sellStatus === '판매 중' ? null : (
            <div className="img-filter">
              <div className="img-label">{item.sellStatus}</div>
            </div>
          )}
        </figure>
        <h5 className="item-category">{item.Category?.categoryName || ''}</h5>
        <h4 className="item-title">{item.postTitle}</h4>
        <p className="item-price">{priceToString(item.productPrice)}원</p>
        {/* <div className="item-time">{elapsedTime(item.createdAt)}</div> */}
      </Link>
    </li>
  );
}

import React from 'react';
import priceToString from '../utils/priceMethods';
import elapsedTime from '../utils/elapsedTime';
import handleScrollToTop from '../utils/handleScrollToTop';
import { Link } from 'react-router-dom';

// 아이템 정보 출력 컴포넌트
export default function ItemList({ item }) {
  const imgUrl = 'https://lieblings-bucket.s3.ap-northeast-2.amazonaws.com/';
  return (
    <li className="list-item">
      <Link to={`/posts/page/${item.postId}`} onClick={handleScrollToTop}>
        <figure className="item-img">
          <img
            src={`${imgUrl}${item.Product_Images[0].imgName}`}
            alt={item.postTitle}
          />
          {item.sellStatus === '판매 중' ? null : (
            <div className="img-filter">
              <div className="img-label">{item.sellStatus}</div>
            </div>
          )}
        </figure>
        <h5 className="item-category">{item.Category.categoryName}</h5>
        <h4 className="item-title">{item.postTitle}</h4>
        <p className="item-price">{priceToString(item.productPrice)}원</p>
        <div className="item-time">{elapsedTime(item.createdAt)}</div>
      </Link>
    </li>
  );
}

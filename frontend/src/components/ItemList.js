import React from 'react';
import priceToString from '../utils/priceMethods';
import elapsedTime from '../utils/elapsedTime';
import { Link } from 'react-router-dom';

export default function ItemList({ item }) {
  return (
    <li className="list-item">
      <Link to={`/posts/${item.postId}`}>
        <figure className="item-img">
          <img src={item.Product_Image[0].imgName} alt={item.postTitle} />
        </figure>
        <h5 className="item-category">{item.Category.categoryName}</h5>
        <h4 className="item-title">{item.postTitle}</h4>
        <p className="item-price">{priceToString(item.productPrice)}원</p>
        <div className="item-time">{elapsedTime(item.createdAt)}</div>
      </Link>
    </li>
  );
}

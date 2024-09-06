import React from 'react';
import { Link } from 'react-router-dom';

export default function CartBtn({ post }) {
  // console.log(post);

  return (
    <div>
      <span className="link-container">
        <Link to={'/cart/:userId'} className="btn shopping">
          장바구니
        </Link>
        <Link to={'/order'} className="btn buy">
          구매하기
        </Link>
      </span>
    </div>
  );
}

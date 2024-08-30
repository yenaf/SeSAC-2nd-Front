import React from "react";
import "../styles/pages/PostCreatePage.scss";

// 판매글 작성 페이지
export default function PostCreatePage() {
  return (
    <section>
      <div class="inner">
        <h2>판매글 작성</h2>
        <form>
          <div className="product-info">
            <h3>상품명</h3>
            <span>
              <input type="text" />
            </span>
          </div>

          <div className="product-info">
            <h3>카테고리</h3>
            <label htmlFor="kpop">
              K-POP
              <input type="radio" id="kpop" />
            </label>
          </div>

          <div className="product-info">
            <h3>상품유형</h3>
            <input type="text" />
          </div>
          <div className="product-info">
            <h3>상품상태</h3>
            <input type="text" />
          </div>

          <div className="product-info">
            <h3>상품가격</h3>
            <input type="text" />
          </div>

          <div className="product-info">
            <h3>상품정보</h3>
            <input type="text" />
          </div>
        </form>
      </div>
    </section>
  );
}

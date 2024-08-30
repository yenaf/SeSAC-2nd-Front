import React from 'react';
import '../styles/pages/PostCreatePage.scss';

// 판매글 작성 페이지
export default function PostCreatePage() {
  return (
    <section>
      <div className="inner">
        <h2>판매글 작성</h2>
        <form>
          {/* 상품명 */}
          <div className="product-info">
            <h3>상품명</h3>
            <span>
              <input type="text" />
            </span>
          </div>
          {/* 카테고리 */}
          <div className="product-info">
            <h3>카테고리</h3>
            <label htmlFor="kpop">
              K-POP
              <input type="radio" id="kpop" />
            </label>
            <label htmlFor="kpop">
              애니메이션
              <input type="radio" id="kpop" />
            </label>
            <label htmlFor="kpop">
              영화/드라마
              <input type="radio" id="kpop" />
            </label>
            <label htmlFor="kpop">
              게임
              <input type="radio" id="kpop" />
            </label>
            <label htmlFor="kpop">
              스포츠
              <input type="radio" id="kpop" />
            </label>
            <label htmlFor="kpop">
              기타
              <input type="radio" id="kpop" />
            </label>
          </div>
          {/* 상품유형 */}
          <div className="product-info">
            <h3>상품유형</h3>
            <input type="text" />
          </div>
          {/* 상품상태 */}
          <div className="product-info">
            <h3>상품상태</h3>
            <input type="text" />
          </div>
          {/* 상품가격 */}
          <div className="product-info">
            <h3>상품가격</h3>
            <input type="text" />
          </div>
          {/* 상품정보 */}
          <div className="product-info">
            <h3>상품정보</h3>
            <input type="text" />
          </div>
          <div>
            <input type="file" />
          </div>
          <button>취소</button>
          <button>등록</button>
        </form>
      </div>
    </section>
  );
}

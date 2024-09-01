import React from 'react';
import '../styles/pages/PostCreatePage.scss';
import FormGroup from '../components/FormGroup';
import RadioGroup from '../components/RadioGroup';
import UploadButton from '../components/UploadButton';

// 판매글 작성 페이지
export default function PostCreatePage() {
  return (
    <section>
      <h2>판매글 작성</h2>
      <form id="form">
        <FormGroup label="상품명">
          <input
            type="text"
            name="product-name"
            required
            placeholder="상품명을 작성해주세요."
          />
        </FormGroup>

        <FormGroup label="카테고리">
          <RadioGroup
            name="category"
            options={[
              { value: 'K-POP', label: 'K-POP' },
              { value: '애니메이션', label: '애니메이션' },
              { value: '영화/드라마', label: '영화/드라마' },
              { value: '게임', label: '게임' },
              { value: '기타', label: '기타' },
            ]}
            required
          />
        </FormGroup>

        <FormGroup label="상품유형">
          <RadioGroup
            name="product-type"
            options={[
              { value: '공식', label: '공식' },
              { value: '비공식', label: '비공식' },
            ]}
            required
          />
        </FormGroup>

        <FormGroup label="상품상태">
          <RadioGroup
            name="product-status"
            options={[
              { value: '새상품', label: '새상품' },
              { value: '중고', label: '중고' },
            ]}
            required
          />
        </FormGroup>

        <FormGroup label="상품가격">
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            placeholder="가격을 입력하세요"
            required
          />
          <span className="won">원</span>
        </FormGroup>

        <div className="form-group product-info">
          <h3>상품정보</h3>
          <textarea
            name="description"
            required
            placeholder=" 작성 예시)
            *상품명 : 
            *구매시기 : 
            *사용기간 : 
            *하자여부 : 
            *상세정보를 입력해주세요.
            "
          ></textarea>
          <span>600자 이내로 작성</span>
        </div>

        <UploadButton />

        <div className="btn-group">
          <button>취소</button>
          <button type="submit">등록</button>
        </div>
      </form>
    </section>
  );
}

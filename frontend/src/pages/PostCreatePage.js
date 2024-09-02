import React from 'react';
import '../styles/pages/PostCreatePage.scss';
import FormGroup from '../components/FormGroup';
import RadioGroup from '../components/RadioGroup';
import UploadButton from '../components/UploadButton';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// 판매글 작성 페이지
export default function PostCreatePage() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data); // 데이터 확인
    // post로 전송
    // 다른 페이지로 이동 (예: 등록 완료 페이지)
    navigate('/posts/:postId', { state: { formData: data } });
  };

  return (
    <section className="post-write">
      <h2>판매글 작성</h2>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="상품명">
          <input
            type="text"
            name="product-name"
            placeholder="상품명을 작성해주세요."
            required
            {...register('postTitle', {
              maxLength: { value: 60 },
            })}
          />
        </FormGroup>

        <FormGroup label="카테고리">
          <RadioGroup
            name="categoryId"
            options={[
              { value: 1, label: 'K-POP' },
              { value: 2, label: '영화/드라마' },
              { value: 3, label: '애니메이션' },
              { value: 4, label: '게임' },
              { value: 5, label: '스포츠' },
              { value: 6, label: '기타' },
            ]}
            required
            register={register}
          />
        </FormGroup>

        <FormGroup label="상품유형">
          <RadioGroup
            name="productType"
            options={[
              { value: '공식', label: '공식' },
              { value: '비공식', label: '비공식' },
            ]}
            required
            register={register}
          />
        </FormGroup>

        <FormGroup label="상품상태">
          <RadioGroup
            name="productState"
            options={[
              { value: '새상품', label: '새상품' },
              { value: '중고', label: '중고' },
            ]}
            required
            register={register}
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
            {...register('productPrice')}
          />
          <span className="won">원</span>
        </FormGroup>

        <div className="form-group product-info">
          <h3>상품정보</h3>
          <textarea
            name="description"
            placeholder=" 작성 예시)
            *상품명 : 
            *구매시기 : 
            *사용기간 : 
            *하자여부 : 
            *상세정보를 입력해주세요.
            "
            required
            {...register('postContent', {
              maxLength: { value: 600 },
            })}
          ></textarea>
          <span>600자 이내로 작성</span>
        </div>

        <UploadButton register={register} />

        <div className="btn-group">
          <button>취소</button>
          <button type="submit">등록</button>
        </div>
      </form>
    </section>
  );
}

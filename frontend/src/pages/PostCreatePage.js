import React, { useContext, useEffect, useState } from 'react';
import '../styles/pages/PostCreatePage.scss';
import FormGroup from '../components/FormGroup';
import RadioGroup from '../components/RadioGroup';
import UploadButton from '../components/UploadButton';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { insertPost } from '../api/post';
import { useDispatch } from 'react-redux';
import { setPreviousUrl } from '../store/navigationSlice';
import { UserContext } from '../hooks/useAuth';
import debounce from '../utils/debounce';

// 판매글 작성 페이지
export default function PostCreatePage() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const { sellerId } = user;

  useEffect(() => {
    dispatch(setPreviousUrl(window.location.pathname));
  }, [dispatch]);

  // 디바운스 적용
  const handleTextChange = debounce((e) => {
    const text = e.target.value;
    setValue('postContent', text);
    setCharCount(text.length);

    // 글자 수가 600자를 초과하면 잘라내기
    if (text.length > 600) {
      setValue('postContent', text.slice(0, 598));
    }
  }, 200);

  const onSubmit = async (data) => {
    const postData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'imgName') {
        postData.append(key, data[key]);
      }
    });
    postData.append('sellerId', sellerId);

    if (data.imgName) {
      for (let i = 0; i < data.imgName.length; i++) {
        postData.append('imgName', data.imgName[i]);
      }
    }

    try {
      if (sellerId) {
        const res = await insertPost(postData);
        const { postId } = res.data.newPost;
        navigate(`/posts/page/${postId}`, { state: { formData: res.data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    const confirmCancel = window.confirm(
      '작성한 내용이 사라집니다. 정말 나가시겠습니까?',
    );
    if (confirmCancel) {
      navigate('/'); // 메인 페이지로 이동
    }
  };

  return (
    <>
      <section className="post-write">
        <h2 className="title">판매글 작성</h2>
        <form
          // action="/posts/create"
          method="POST"
          encType="multipart/form-data"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                { value: 3, label: '게임' },
                { value: 4, label: '애니메이션' },
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
              name="productStatus"
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
              max="100000000"
              step="0.01"
              placeholder="가격을 입력하세요"
              required
              {...register('productPrice', {
                validate: {
                  positive: (value) => value > 0 || '가격은 0보다 커야 합니다.',
                },
              })}
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
              onChange={handleTextChange}
            ></textarea>
            <span>{charCount} / 600</span>
          </div>

          <UploadButton register={register} />

          <div className="btn-group">
            <button type="button" onClick={onCancel}>
              취소
            </button>
            <button type="submit">등록</button>
          </div>
        </form>
      </section>
    </>
  );
}

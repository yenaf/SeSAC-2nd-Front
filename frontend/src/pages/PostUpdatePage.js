import React, { useEffect, useState } from 'react';
import '../styles/pages/PostCreatePage.scss';
import FormGroup from '../components/FormGroup';
import RadioGroup from '../components/RadioGroup';
import UploadButton from '../components/UploadButton';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { patchPost, getPostforEdit } from '../api/post';
import { useDispatch } from 'react-redux';
import { setPreviousUrl } from '../store/navigationSlice';

// 판매글 수정 페이지
export default function PostUpdatePage() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);
  const [postData, setPostData] = useState(null);
  const textValue = watch('postContent', '');
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const [initImages, setInitImages] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [productType, setProductType] = useState('');
  const [productStatus, setProductStatus] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await getPostforEdit(postId);
        setPostData(res.data);
        // Set initial values
        setValue('postTitle', res.data.post.postTitle);
        setValue('productPrice', res.data.post.productPrice);
        setValue('postContent', res.data.post.postContent);
        setCategoryId(res.data.post.categoryId);
        setProductType(res.data.post.productType);
        setProductStatus(res.data.post.productStatus);
        setInitImages(res.data.post.Product_Images);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    fetchPostData();
  }, [postId, setValue]);

  useEffect(() => {
    dispatch(setPreviousUrl(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    setCharCount(textValue.length);
    // 글자 수가 600 이상인 경우, 입력을 막기 위해 마지막 글자를 제거
    if (textValue.length > 600) {
      setValue('postContent', textValue.slice(0, 600));
    }
  }, [textValue, setValue]);

  const onSubmit = async (data) => {
    // userId가 있어야 판매하기가 보여짐
    // 만약에 userId는 있고, sellerId가 없는 상태에서 판매하기 버튼을 부르면 판매자 등록페이지로 이동
    // sellerId는 session에서 가져오기
    let sellerId;
    const userString = window.sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      sellerId = user.sellerId;
    } else {
      console.log('세션스토리지에 접근하는 중 오류가 발생했습니다.');
    }

    const updateData = new FormData();
    updateData.append('sellerId', sellerId);

    Object.keys(data).forEach((key) => {
      if (key !== 'imgName') {
        updateData.append(key, data[key]);
      }
    });

    if (data.imgName) {
      for (let i = 0; i < data.imgName.length; i++) {
        updateData.append('imgName', data.imgName[i]);
      }
    }

    try {
      if (sellerId) {
        const res = await patchPost(postId, updateData);
        navigate(`/posts/page/${postId}`, { state: { formData: res.data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    const confirmCancel = window.confirm(
      '수정 내용이 저장되지 않습니다. 정말 나가시겠습니까?',
    );
    if (confirmCancel) {
      navigate(-1); // 이전 페이지로 이동
    }
  };

  return (
    <>
      <section className="post-write">
        <h2 className="title">판매글 수정</h2>
        <form
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
                { value: 3, label: '애니메이션' },
                { value: 4, label: '게임' },
                { value: 5, label: '스포츠' },
                { value: 6, label: '기타' },
              ]}
              required
              register={register}
              defaultValue={categoryId}
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
              defaultValue={productType}
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
              defaultValue={productStatus}
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
            ></textarea>
            <span>{charCount} / 600</span>
          </div>

          <UploadButton register={register} defaultValue={initImages} />

          <div className="btn-group">
            <button type="button" onClick={onCancel}>
              취소
            </button>
            <button type="submit" onClick={onSubmit}>
              수정
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

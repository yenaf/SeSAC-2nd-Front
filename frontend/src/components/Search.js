import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

// 검색 인풋창 컴포넌트
export default function Search() {
  const [page, setPage] = useState(1);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;

  useEffect(() => {
    // 검색 페이지를 벗어나면 검색창 초기화
    if (!search.includes('postTitle')) {
      inputRef.current.value = '';
    }
  }, [location]);

  const searchkeyword = () => {
    const keyword = inputRef.current.value.trim();
    if (keyword === '') return alert('검색어를 입력해주세요');
    navigate({
      pathname: `/posts/list/${page}`,
      search: `?postTitle=${keyword}`,
    });
  };

  const searchEnter = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing == false) {
      searchkeyword();
    }
  };
  return (
    <div className="header-searchbox">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="어떤 상품을 찾으시나요?"
        ref={inputRef}
        onKeyDown={searchEnter}
      />
      <button
        className="search-btn"
        style={{ cursor: 'pointer' }}
        onClick={searchkeyword}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

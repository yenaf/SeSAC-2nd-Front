import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// 검색 인풋창 컴포넌트
export default function Search() {
  return (
    <div className='header-searchbox'>
        <input type='text' id='search' name='search' placeholder='어떤 상품을 찾으시나요?'/>
        <button className='search-btn'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
    </div>
  )
}

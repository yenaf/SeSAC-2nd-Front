import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common/_reset.scss';

export default function GoToContent() {
  const handleScrollToContent = () => {
    const element = document.getElementById('content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleScrollToContent();
    }
  };

  return (
    <>
      <p id="skipNav">
        <Link
          to="#content"
          className="go-content"
          onKeyDown={handleKeyDown}
          onClick={handleScrollToContent}
          tabIndex={0}
        >
          본문 바로가기
        </Link>
      </p>
    </>
  );
}

import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/layout/ScrollBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import handleScrollToTop from '../utils/handleScrollToTop';

// 스크롤 탑 버튼 컴포넌트
function ScrollBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 80) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          type="button"
          onClick={handleScrollToTop}
          className="scroll-btn"
        >
          <FontAwesomeIcon icon={faCircleChevronUp} className="scroll-icon" />
        </button>
      )}
    </div>
  );
}

export default ScrollBtn;

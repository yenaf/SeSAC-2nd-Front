import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/layout/ScrollBtn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
function ScrollBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 80) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

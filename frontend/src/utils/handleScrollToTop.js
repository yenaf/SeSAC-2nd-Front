// 맨 위로 올라감
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default handleScrollToTop;

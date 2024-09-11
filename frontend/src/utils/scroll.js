import $ from 'jquery';

// 스크롤 멈추기
const stopScroll = () => {
  $('body')
    .css({ overflow: 'hidden' })
    .on('scroll touchmove mousewheel', function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
};

// 스크롤 재동작
const goScroll = () => {
  $('body').css({ overflowY: 'scroll' }).off('scroll touchmove mousewheel');
};

export { stopScroll, goScroll };

// 시간 표시 함수
const elapsedTime = (date) => {
  // 글 작성 시간
  const start = new Date(date);
  // 현재 시간
  const end = new Date();

  // 방금 전
  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return '방금 전';

  // 분 표시
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  // 시간 표시
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  // 일 표시
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  const year = start.getFullYear();
  const month = start.getMonth() + 1;
  const day = start.getDate();

  const addZero = (num) => (num < 10 ? '0' + num : num);
  // 7일이 지나면 날짜로 표시
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

export default elapsedTime;

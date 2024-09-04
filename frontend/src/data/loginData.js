// 회원정보 버튼들 데이터
export const loginMenu = [
  [
    // 로그인
    {
      title: '장바구니',
      path: `/cart`,
      icon: 'fa-basket-shopping',
    },
    {
      title: '마이페이지',
      path: '/mypage',
      icon: 'fa-user',
    },
    {
      title: '로그아웃',
      path: '/user/logout',
      icon: 'fa-right-from-bracket',
    },
  ],
  [
    // 로그아웃
    {
      title: '장바구니',
      path: '/user/login',
      icon: 'fa-basket-shopping',
    },
    {
      title: '회원가입',
      path: '/user/register',
      icon: 'fa-user',
    },
    {
      title: '로그인',
      path: '/user/login',
      icon: 'fa-right-to-bracket',
    },
  ],
  [
    // 관리자
    {
      title: '장바구니',
      path: '/',
      icon: 'fa-basket-shopping',
    },
    {
      title: '관리자 페이지',
      path: '/admin',
      icon: 'fa-user',
    },
    {
      title: '로그아웃',
      path: '/user/logout',
      icon: 'fa-right-from-bracket',
    },
  ],
];

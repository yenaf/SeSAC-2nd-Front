const adminAllUserData = [
  // 제공되어야할 정보 [전체 회원(아이디, 닉네임, 판매자여부, 약관동의(필수), 약관동의(선택))]
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
  {
    userId: 1,
    loginId: 'test01',
    nickName: '테스트',
    Seller: { sellerId: 1 }, // 이 값이 없으면 판매자가 아닌거..?
    Terms_Agree: {
      isRequiredAgreed: true,
      isOptionalAgreed: false,
    },
  },
];
const adminSellerData = [
  // 제공되어야할 정보 [전체 판매자(아이디, 판매자명, 신고누적횟수, 블랙리스트여부)]
  {
    userId: '',
    sellerId: '',
    sellerName: '',
    complaintCount: '', // 이거는 신고... 된거 count해서 줘야할듯..?
    User: {
      isBlacklist: false,
    },
  },
];
const adminComplaintData = [
  // 제공되어야할 정보 [판매자 개인(판매자명, 판매글제목(상품명), 글 내용(요약), 신고사유)]
  {
    sellerId: '',
    sellerName: '',
    Post: {
      postTitle: '',
      postContent: '',
    },
    Complaint: {
      complaintContent: '',
    },
  },
];
const adminBlackListData = [
  // 제공되어야할 정보 [전체블랙리스트(아이디, 판매자명, 신고누적횟수)]
  {
    userId: '',
    loginId: '',
    Seller: {
      sellerName: '',
    },
    complaintCount: '', // 이거는 신고... 된거 count해서 줘야할듯..?
  },
];
const adminOrderLogsData = [
  // 제공되어야할 정보[구매번호, 판매글번호, 상품명, 판매자, 구매자, 입금내역, 출금내역, 거래날짜?]
  {
    orderLogId: '',
    deposit: '', // 입금내역
    withdrow: '', // 출금내역
    createAt: '',
    Order: {
      orderId: '',
      userId: '',
      User: {
        nickName: '',
      },
    },
    Post: {
      postId: '',
      postTitle: '',
      sellerId: '',
      Seller: {
        sellerName: '',
      },
    },
  },
];

export {
  adminAllUserData,
  adminBlackListData,
  adminComplaintData,
  adminOrderLogsData,
  adminSellerData,
};

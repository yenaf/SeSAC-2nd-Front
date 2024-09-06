const sellData = [
  {
    allOrderId: '1111111111',
    orderId: 1,
    postId: 1,
    // sellerId는 세션에서 받아옴
    userId: 1, // 이거는 세션의 내 아이디가 아니라 구매자의 userId
    deliveryStatus: '배송 전',
    isConfirmed: false,
    invoiceNumber: '123456789012',

    Post: {
      postTitle: '쿠로미양말',
      productPrice: 50000,
      sellStatus: '판매 예약',

      Product_Image: [
        {
          imgName:
            'https://item.elandrs.com/upload/prd/orgimg/961/2209364961_0000002.jpg?w=&h=330&q=100', // s3 로케이션 정보 들어갈 예정
        },
      ],
    },
  },
  {
    allOrderId: '1111111111',
    orderId: 1,
    postId: 1,
    // sellerId는 세션에서 받아옴
    userId: 1, // 이거는 세션의 내 아이디가 아니라 구매자의 userId
    deliveryStatus: '배송 전',
    isConfirmed: false,
    invoiceNumber: '123456789012',

    Post: {
      postTitle: '쿠로미양말',
      productPrice: 50000,
      sellStatus: '판매 예약',

      Product_Image: [
        {
          imgName:
            'https://item.elandrs.com/upload/prd/orgimg/961/2209364961_0000002.jpg?w=&h=330&q=100', // s3 로케이션 정보 들어갈 예정
        },
      ],
    },
  },
  {
    allOrderId: '2222222222',
    orderId: 2,
    postId: 2,
    // sellerId는 세션에서 받아옴
    userId: 1, // 이거는 세션의 내 아이디가 아니라 구매자의 userId
    deliveryStatus: '배송 중',
    isConfirmed: false,
    invoiceNumber: '123456789013',

    Post: {
      postTitle: '쿠로미잠옷',
      productPrice: 30000,
      sellStatus: '판매 완료',

      Product_Image: [
        {
          imgName:
            'https://item.elandrs.com/upload/prd/orgimg/961/2209364961_0000002.jpg?w=&h=330&q=100', // s3 로케이션 정보 들어갈 예정
        },
      ],
    },
  },
];

export default sellData;

// 장바구니 페이지에 쓰일 임시 장바구니 데이터
// 유저의 아이디별로 장바구니를 보여줌
const cartData = [
  {
    cartId: 1, // 장바구니 번호
    postId: 1, // 판매글 번호
    Post: {
      // 장바구니 테이블과 조인될 판매글 테이블 데이터
      sellerId: 1, // 판매자 번호

      categoryId: 1, // 카테고리 번호

      cartegoryId: 1, // 카테고리 번호
      postTitle: '짱구잠옷', // 판매글 제목
      productPrice: 10000, // 상품 가격
      productType: '공식', // 상품 유형
      productStatus: '중고', // 상품 상태
      Seller: {
        sellerName: '잠옷조아', // 판매자 이름
        sellerName: '짱구러버', // 판매자 이름
        Delivery: {
          deliveryName: '우체국',
          deliveryFee: 3000,
        },
      },
      Category: {
        categoryName: '애니메이션', // 카테고리 이름
      },
      Product_Image: {
        imgName:
          'https://item.elandrs.com/upload/prd/orgimg/961/2209364961_0000002.jpg?w=&h=330&q=100', // s3 로케이션 정보 들어갈 예정
        Catogory: {
          categoryName: '애니메이션', // 카테고리 이름
        },
        Product_Image: {
          imgName: '', // s3 로케이션 정보 들어갈 예정
        },
      },
    },
  },
  {
    cartId: 2, // 장바구니 번호
    postId: 2, // 판매글 번호
    Post: {
      // 장바구니 테이블과 조인될 판매글 테이블 데이터
      sellerId: 1, // 판매자 번호
      categoryId: 1, // 카테고리 번호
      postTitle: '피카츄잠옷', // 판매글 제목
      productPrice: 20000, // 상품 가격
      productType: '공식', // 상품 유형
      productStatus: '중고', // 상품 상태
      Seller: {
        sellerName: '잠옷조아', // 판매자 이름
        Delivery: {
          deliveryName: '우체국',
          deliveryFee: 3000,
        },
      },
      Category: {
        categoryName: '애니메이션', // 카테고리 이름
      },
      Product_Image: {
        imgName:
          'https://item.elandrs.com/r/image/item/2024-07-04/64b7b213-c2a5-461a-b948-9d4f9f474eac.jpg?w=&h=330&q=100', // s3 로케이션 정보 들어갈 예정
      },
    },
  },
  {
    cartId: 3, // 장바구니 번호
    postId: 3, // 판매글 번호
    Post: {
      // 장바구니 테이블과 조인될 판매글 테이블 데이터
      sellerId: 2, // 판매자 번호
      categoryId: 1, // 카테고리 번호
      postTitle: '쿠로미 가습기', // 판매글 제목
      productPrice: 20000, // 상품 가격
      productType: '공식', // 상품 유형
      productStatus: '중고', // 상품 상태
      Seller: {
        sellerName: '포켓몬트레이너', // 판매자 이름
        Delivery: {
          deliveryName: '우체국',
          deliveryFee: 3000,
        },
      },
      Category: {
        categoryName: '애니메이션', // 카테고리 이름
      },
      Product_Image: {
        imgName:
          'http://thumbnail.10x10.co.kr/webimage/image/basic/405/B004051527-6.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false', // s3 로케이션 정보 들어갈 예정
      },
    },
  },
  {
    cartId: 4, // 장바구니 번호
    postId: 4, // 판매글 번호
    Post: {
      // 장바구니 테이블과 조인될 판매글 테이블 데이터
      sellerId: 2, // 판매자 번호
      categoryId: 2, // 카테고리 번호
      postTitle: 'bunini 코스튬 인형 (YELLOW)', // 판매글 제목
      productPrice: 10000, // 상품 가격
      productType: '공식', // 상품 유형
      productStatus: '중고', // 상품 상태
      Seller: {
        sellerName: '포켓몬트레이너', // 판매자 이름
        Delivery: {
          deliveryName: '우체국',
          deliveryFee: 3000,
        },
      },
      Category: {
        categoryName: 'K-POP', // 카테고리 이름
      },
      Product_Image: {
        imgName:
          'https://linefriendssquare.com/cdn/shop/files/newjeans-plush-yellow-new-yellow-38881496662215.jpg?v=1708901050&width=360', // s3 로케이션 정보 들어갈 예정
      },
    },
  },
  {
    cartId: 5, // 장바구니 번호
    postId: 5, // 판매글 번호
    Post: {
      // 장바구니 테이블과 조인될 판매글 테이블 데이터
      sellerId: 2, // 판매자 번호
      categoryId: 3, // 카테고리 번호
      postTitle: '쿠키런 키링', // 판매글 제목
      productPrice: 10000, // 상품 가격
      productType: '공식', // 상품 유형
      productStatus: '중고', // 상품 상태
      Seller: {
        sellerName: '포켓몬트레이너', // 판매자 이름
        Delivery: {
          deliveryName: '우체국',
          deliveryFee: 3000,
        },
      },
      Category: {
        categoryName: '게임', // 카테고리 이름
      },
      Product_Image: {
        imgName:
          'https://shop-phinf.pstatic.net/20231218_283/1702888389585iOVWR_JPEG/104024169265507807_1097648989.jpg?type=f296_296', // s3 로케이션 정보 들어갈 예정
      },
    },
  },
];

export default cartData;

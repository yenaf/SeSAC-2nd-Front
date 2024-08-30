// 장바구니 페이지에 쓰일 임시 장바구니 데이터
// 유저의 아이디별로 장바구니를 보여줌
const cartData = [
    {
        cartId : 1, // 장바구니 번호
        postId : 1, // 판매글 번호
        Post : { // 장바구니 테이블과 조인될 판매글 테이블 데이터
            sellerId : 1, // 판매자 번호
            cartegoryId : 1, // 카테고리 번호
            postTitle : '짱구잠옷', // 판매글 제목
            productPrice : 10000, // 상품 가격
            productType : '공식', // 상품 유형
            productStatus : '중고', // 상품 상태
            Seller  : {
                sellerName : '짱구러버', // 판매자 이름
                Delivery : {
                    deliveryName : '우체국',
                    deliveryFee : 3000
                }
            },
            Catogory  : {
                categoryName : '애니메이션' // 카테고리 이름
            },
            Product_Image : {
                imgName : '' // s3 로케이션 정보 들어갈 예정
            }
        }
    }, 
    {
        cartId : 2, // 장바구니 번호
        postId : 2, // 판매글 번호
        Post : { // 장바구니 테이블과 조인될 판매글 테이블 데이터
            sellerId : 1, // 판매자 번호
            cartegoryId : 1, // 카테고리 번호
            postTitle : '짱구잠옷', // 판매글 제목
            productPrice : 20000, // 상품 가격
            productType : '공식', // 상품 유형
            productStatus : '중고', // 상품 상태
            Seller  : {
                sellerName : '짱구러버', // 판매자 이름
                Delivery : {
                    deliveryName : '우체국',
                    deliveryFee : 3000
                }
            },
            Catogory  : {
                categoryName : '애니메이션' // 카테고리 이름
            },
            Product_Image : {
                imgName : '' // s3 로케이션 정보 들어갈 예정
            }
        }
    }, 
    {
        cartId : 3, // 장바구니 번호
        postId : 3, // 판매글 번호
        Post : { // 장바구니 테이블과 조인될 판매글 테이블 데이터
            sellerId : 2, // 판매자 번호
            cartegoryId : 1, // 카테고리 번호
            postTitle : '짱구잠옷', // 판매글 제목
            productPrice : 10000, // 상품 가격
            productType : '공식', // 상품 유형
            productStatus : '중고', // 상품 상태
            Seller  : {
                sellerName : '짱아러버', // 판매자 이름
                Delivery : {
                    deliveryName : '우체국',
                    deliveryFee : 3000
                }
            },
            Catogory  : {
                categoryName : '애니메이션' // 카테고리 이름
            },
            Product_Image : {
                imgName : '' // s3 로케이션 정보 들어갈 예정
            }
        }
    }, 
    {
        cartId : 4, // 장바구니 번호
        postId : 4, // 판매글 번호
        Post : { // 장바구니 테이블과 조인될 판매글 테이블 데이터
            sellerId : 2, // 판매자 번호
            cartegoryId : 2, // 카테고리 번호
            postTitle : '짱구잠옷', // 판매글 제목
            productPrice : 10000, // 상품 가격
            productType : '공식', // 상품 유형
            productStatus : '중고', // 상품 상태
            Seller  : {
                sellerName : '짱아러버', // 판매자 이름
                Delivery : {
                    deliveryName : '우체국',
                    deliveryFee : 3000
                }
            },
            Catogory  : {
                categoryName : '애니메이션' // 카테고리 이름
            },
            Product_Image : {
                imgName : '' // s3 로케이션 정보 들어갈 예정
            }
        }
    }, 
]

export default cartData;

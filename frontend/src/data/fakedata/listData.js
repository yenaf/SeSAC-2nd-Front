// const listData = [
//   {
//     postId: 1,
//     sellerId: 1,
//     Seller: {
//       userId: 1,
//       User: {
//         isBlackList: false,
//       },
//     },
//     Product_Image: [
//       {
//         imgName:
//           'http://thumbnail.10x10.co.kr/webimage/image/basic/405/B004051527-6.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false',
//       },
//     ],
//     postTitle: '쿠로미가 신던 양말을 훔친 마이멜로디가 쓰던 쿠로미 가습기',
//     productPrice: 10000,
//     categoryId: 1,
//     Category: {
//       categoryName: '애니메이션',
//     },
//     sellStatus: '판매 중',
//     isDeleted: false,
//     createdAt: '2024-09-04 09:18:35',
//   },
// ];

const listDataFn = () => {
  let itemArr = [];
  const itemObjs = (idx) => {
    const obj = {
      postId: idx,
      sellerId: idx,
      Seller: {
        userId: idx,
        User: {
          isBlackList: false,
        },
      },
      Product_Image: [
        {
          imgName:
            'http://thumbnail.10x10.co.kr/webimage/image/basic/405/B004051527-6.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false',
        },
      ],
      postTitle: '쿠로미가 신던 양말을 훔친 마이멜로디가 쓰던 쿠로미 가습기',
      productPrice: 10000,
      categoryId: 1,
      Category: {
        categoryName: '애니메이션',
      },
      sellStatus: '판매 완료',
      isDeleted: false,
      createdAt: '2024-09-04 09:18:35',
    };
    return obj;
  };
  for (let i = 1; i < 100; i++) {
    itemArr.push(itemObjs(i));
  }
  return itemArr;
};

export default listDataFn;

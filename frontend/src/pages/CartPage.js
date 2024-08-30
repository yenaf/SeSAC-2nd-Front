import React from 'react';
import { useParams } from 'react-router-dom';
import cartData from '../data/fakedata/cartData';

// 장바구니 페이지
export default function CartPage() {
  const { userId } = useParams();

  // 판매자별로 아이템 묶기
  const groupedBySeller = cartData.reduce((acc, item) => {
    // 현재 아이템의 sellerId를 가져온다.
    const sellerId = item.Post.sellerId;

    // 누적기에 sellerId가 없으면 새로운 배열을 생성
    if (!acc[sellerId]) {
        acc[sellerId] = [];
    }

    // 해당 sellerId에 맞는 배열에 아이템을 추가
    acc[sellerId].push(item);

    return acc;
  }, {});

  // 결과를 배열로 변환
  const sellerByCartData = Object.keys(groupedBySeller).map(key => ({
    sellerId: parseInt(key, 10),
    items: groupedBySeller[key]
  }));

  console.log(sellerByCartData);

  
  // 임시 장바구니 데이터
  return (
    <div className='cart'>
      {/* 장바구니 아이템 */}
      <section className='cart-items'>
        {/* 전체선택/선택삭제 */}
        <div className='cart-selection'>
          {/* 전체선택 */}
          <div className='allitem-checkbx'>
            <input type='checkbox' id='chk-allitem' name='chk-allitem'/>
            <label htmlFor='chk-allitem'>전체선택</label>
          </div>
          <button>선택삭제</button>
        </div>
        <ul className='cart-itemlists'>
        {
          // 장바구니 아이템들, 판매자별로 묶어서 보여주기
          sellerByCartData.map((value, idx)=>(
            <li key={idx}>
              {/* 판매자 정보 */}
              <h3>{value.items[0].Post.Seller.sellerName}</h3>
              {/* 아이템 리스트 */}
              <ol>
                {
                  value.items.map((val, idx) => (
                    <li key={idx}>

                    </li>
                  ))
                }
              </ol>
              {/* 배송비 */}
              <p>
                배송비 : 
                <span>{value.items[0].Post.Seller.Delivery.deliveryName}</span>
                /
                <span>{value.items[0].Post.Seller.Delivery.deliveryFee}</span>
              </p>
            </li>
          ))
        }
        </ul>
      </section>
      {/* 장바구니에 들어있는 아이템들 선택된 것들에 대한 비용 */}
      <section className='cart-amount'></section>
    </div>
  )
}

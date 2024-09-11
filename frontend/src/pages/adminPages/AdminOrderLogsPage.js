import React, { useEffect, useState } from 'react';
import { getOrderLogs } from '../../api/admin';
import priceToString from '../../utils/priceMethods';

export default function AdminOrderLogsPage() {
  const [orderlogs, setOrderlogs] = useState(null);

  useEffect(() => {
    fetchOrderlogs();
  }, []);

  const fetchOrderlogs = async () => {
    try {
      const res = await getOrderLogs();
      if (res.status === 200) {
        setOrderlogs(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stringDay = (date) => {
    const createDate = new Date(date);
    const year = createDate.getFullYear();
    const month = createDate.getMonth() + 1;
    const day = createDate.getDate();

    const addZero = (num) => (num < 10 ? '0' + num : num);

    return `${year}-${addZero(month)}-${addZero(day)}`;
  };
  return (
    <div className="admin-content">
      <h2 className="admin-title">전체 거래 내역 조회</h2>
      <table className="admin-orderlogTable">
        <thead>
          <tr>
            <th>구매번호</th>
            <th>판매번호</th>
            <th>상품명</th>
            <th>판매자</th>
            <th>구매자</th>
            <th>입금내역</th>
            <th>출금내역</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {orderlogs ? (
            orderlogs.length > 0 ? (
              orderlogs.map((log, idx) => (
                <tr key={idx}>
                  <td>{log.Order.orderId}</td>
                  <td>{log.Order.Post.postId}</td>
                  <td>{log.Order.Post.postTitle}</td>
                  <td>{log.Order.Post.Seller.sellerName}</td>
                  <td>{log.Order.User.nickName}</td>
                  <td style={{ color: 'red' }}>
                    {log.deposit
                      ? '+ ' + priceToString(log.deposit) + '원'
                      : '-'}
                  </td>
                  <td style={{ color: 'blue' }}>
                    {log.withdraw
                      ? log.logStatus === '환불'
                        ? '- ' + priceToString(log.withdraw) + '원(환불)'
                        : '- ' + priceToString(log.withdraw) + '원'
                      : '-'}
                  </td>
                  <td>{stringDay(log.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">주문 기록이 없습니다.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="8">주문 기록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

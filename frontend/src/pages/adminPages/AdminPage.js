import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderLogs } from '../../api/admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import priceToString from '../../utils/priceMethods';

// 관리자 페이지
export default function AdminPage() {
  const adminBtns = [
    { title: 'allUser', kor: '전체 회원 관리' },
    { title: 'seller', kor: '판매자 관리' },
    { title: 'blacklist', kor: '블랙리스트 관리' },
    { title: 'orderlogs', kor: '전체 거래 내역 조회' },
  ];

  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  const datesRef = useRef(null);

  const [pickDay, setPickday] = useState('');
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithDraw, setTotalWithDraw] = useState(0);
  const [orderlogs, setOrderlogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(thisMonth);
  const [year, setYear] = useState(thisYear);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setPickday(showDay(today));
    fetchOrderlogs();
  }, []);

  useEffect(() => {
    const today = timeSetting(new Date());

    if (loading) {
      // 오늘 날짜 총 입금
      const todayDeposit = sumDeposit(orderlogs, today);
      setTotalDeposit(todayDeposit);
      // 오늘 날짜 총 출금
      const todayWithdraw = sumWithdraw(orderlogs, today);
      setTotalWithDraw(todayWithdraw);

      const dates = document.querySelectorAll('.calendar .date');
      dates.forEach((ele) => {
        ele.onclick = () => {
          const selectDate = ele.getAttribute('data-date');
          const selectedDate = new Date(selectDate);
          setPickday(showDay(selectedDate));
          // 선택한 날짜의 총 입/출금 금액 보여주기
          const selectedDateDeposit = sumDeposit(orderlogs, selectDate);
          const selectedDateWithdraw = sumWithdraw(orderlogs, selectDate);
          setTotalDeposit(selectedDateDeposit);
          setTotalWithDraw(selectedDateWithdraw);
        };
      });
    }
  }, [loading, orderlogs, month, year]);

  // 거래 내역 가져오기
  const fetchOrderlogs = async () => {
    try {
      const res = await getOrderLogs();
      if (res.status === 200) {
        setOrderlogs(res.data);
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 오늘 날짜 표시
  const showDay = (today) => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  // 시간 세팅
  const timeSetting = (date) => {
    const thisDate = new Date(date);

    const year = thisDate.getFullYear();
    const month = thisDate.getMonth() + 1;
    const day = thisDate.getDate();

    const addZero = (num) => (num < 10 ? '0' + num : num);
    return `${year}-${addZero(month)}-${addZero(day)}`;
  };

  // 날짜별로 입금내역 합산
  const sumDeposit = (data, date) => {
    const deposit = data.reduce((total, entry) => {
      if (entry.deposit !== null) {
        const entryDate = timeSetting(entry.createdAt);
        if (entryDate === date) {
          total += entry.deposit;
        }
      }
      return total;
    }, 0);
    return deposit;
  };

  // 날짜별로 출금내역 합산(환불은 제외)
  const sumWithdraw = (data, date) => {
    const withdraw = data.reduce((total, entry) => {
      if (entry.withdraw !== null && entry.logStatus !== '환불') {
        const entryDate = timeSetting(entry.createdAt);
        if (entryDate === date) {
          total += entry.withdraw;
        }
      }
      return total;
    }, 0);
    return withdraw;
  };

  // 달력 만드는 함수
  const generateCalendarDates = () => {
    const thisDate = new Date(year, month - 1);
    const today = new Date();

    const prevLast = new Date(thisDate.getFullYear(), thisDate.getMonth(), 0);
    const prevDate = prevLast.getDate();
    const prevDay = prevLast.getDay();

    const thisFirst = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
    const firstDay = thisFirst.getDay();

    const thisLast = new Date(
      thisDate.getFullYear(),
      thisDate.getMonth() + 1,
      0,
    );
    const endDate = thisLast.getDate();

    let dateElements = [];

    // 이전달 날짜
    if (firstDay !== 0) {
      for (let i = 0; i < firstDay; i++) {
        dateElements.push(
          <div
            key={`prev-${prevDate - i}`}
            className="date"
            style={{ color: '#ccc' }}
          >
            {prevDate - i}
          </div>,
        );
      }
    }

    // 이번달 날짜
    for (let i = 1; i <= endDate; i++) {
      const dateString = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isToday =
        today.getDate() === i &&
        today.getMonth() === thisDate.getMonth() &&
        today.getFullYear() === thisDate.getFullYear();
      dateElements.push(
        <div key={i} className={`date`} data-date={dateString}>
          {i}
          {isToday ? <span className="today"></span> : ''}
        </div>,
      );
    }

    return dateElements;
  };

  // 이전달 달력으로 이동
  const handlePrevMonth = () => {
    const dates = datesRef.current;
    setMonth((prev) => {
      if (prev === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      }
      return prev - 1;
    });
    const dateElements = dates.querySelectorAll('.date');
    dateElements.forEach((ele) => {
      ele.onclick = () => {
        setSelectedDate(ele.getAttribute('data-date'));
      };
    });
  };

  // 다음달 달력으로 이동
  const handleNextMonth = () => {
    const dates = datesRef.current;
    setMonth((prev) => {
      if (prev === 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      }
      return prev + 1;
    });
    const dateElements = dates.querySelectorAll('.date');
    dateElements.forEach((ele) => {
      ele.onclick = () => {
        setSelectedDate(ele.getAttribute('data-date'));
      };
    });
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">어서오세요!</h2>
      <div className="admin-salesRecords">
        <div className="admin-calendar">
          <div className="calendar">
            <div className="calendar-header">
              <button className="prev month-btn" onClick={handlePrevMonth}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <h2 className="calendar-title">
                <div className="year-title">{year}</div>
                <div className="month-title">{month}</div>
              </h2>
              <button className="next month-btn" onClick={handleNextMonth}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <section className="cal-wrap">
              <div className="week">
                <div className="day">SUN</div>
                <div className="day">MON</div>
                <div className="day">TUE</div>
                <div className="day">WED</div>
                <div className="day">THU</div>
                <div className="day">FRI</div>
                <div className="day">SAT</div>
              </div>
              <div className="dates" ref={datesRef}>
                {generateCalendarDates()}
              </div>
            </section>
          </div>
        </div>
        <div className="admin-sales">
          <div className="admin-pickDay">{pickDay} 거래 금액</div>
          <div className="admin-totalDeposit admin-totalTrade">
            <h4>
              총 입금 금액 <span>{priceToString(totalDeposit)}</span>원
            </h4>
          </div>
          <div className="admin-totalWithDraw admin-totalTrade">
            <h4>
              총 출금 금액 <span>{priceToString(totalWithDraw)}</span>원
            </h4>
          </div>
        </div>
      </div>
      <div className="admin-menuBtns">
        <ul>
          {adminBtns.map((ele, idx) => (
            <li key={idx}>
              <Link to={`/admin/${ele.title}`}>
                <figure>
                  <img src={`/img/${ele.title}.png`} alt={ele.kor} />
                  <figcaption>{ele.kor}</figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

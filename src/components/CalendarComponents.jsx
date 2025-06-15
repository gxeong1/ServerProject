import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import CalendarOverlay from './CalendarOverlay';
import '../styles/CustomCalendar.css';

const CalendarComponents = ({ schedules, categories }) => {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef(null);

  return (
    <div className="container">
      <div
        className="calendar-container"
        ref={calendarRef}
        style={{ position: 'relative' }}
      >
        <Calendar
          onChange={setDate}
          value={date}
          locale="en-US"
          formatDay={(locale, date) => date.getDate()}
          formatMonthYear={(locale, date) =>
            date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
          }
          tileClassName={({ date: tileDate, view }) => {
            const now = new Date();
            // 이웃 달 날짜는 스타일 다르게 처리
            if (view === 'month' && tileDate.getMonth() !== now.getMonth()) {
              return 'custom-neighbor';
            }
            return null;
          }}
          tileContent={({ date }) => {
            // 날짜마다 data-date 속성 부여 (YYYYMMDD 형태)
            const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, '');
            return <div data-date={yyyymmdd} />;
          }}
        />

        {/* 일정 표시 오버레이 */}
        <CalendarOverlay
          schedules={schedules}
          categories={categories}
          calendarRef={calendarRef}
        />
      </div>
    </div>
  );
};

export default CalendarComponents;

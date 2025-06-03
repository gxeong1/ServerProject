import { useState } from 'react';
import Calendar from 'react-calendar';
import '../styles/CustomCalendar.css'; 

const CalendarComponents = () => {
    const [date, setDate] = useState(new Date());
  
    return (
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          locale="ko-KR"
          formatDay={(locale, date) => date.getDate()}
          tileClassName={({ date: tileDate, view }) => {
            const now = new Date();
            if (view === 'month' && tileDate.getMonth() !== now.getMonth()) {
              return 'custom-neighbor';
            }
          }}
        />
      </div>
    );
  };
  
  export default CalendarComponents;
  
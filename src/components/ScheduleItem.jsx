import React from 'react';
import '../styles/ScheduleItem.css';

const ScheduleItem = ({ text, done, date, onToggle }) => {
  return (
    <div className="schedule-item">
      <div className="schedule-left">
        <div
          className='schedule-circle'
        ></div>
        <span className={`schedule-text ${done ? 'done' : ''}`}>{text}</span>
      </div>
      <span className="schedule-date">{date}</span>
    </div>
  );
};

export default ScheduleItem;

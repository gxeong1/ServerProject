import React from 'react';

// YYYYMMDD 또는 MM/DD, MM/DD~MM/DD 형태를 모두 처리하는 함수
const formatDateDisplay = (date) => {
  // date가 이미 MM/DD 형식이면 그냥 리턴
  if (/^\d{2}\/\d{2}(~\d{2}\/\d{2})?$/.test(date)) {
    return date;
  }

  // YYYYMMDD 형식 혹은 YYYYMMDD~YYYYMMDD 형태 처리
  if (date.includes('~')) {
    const [start, end] = date.split('~');
    return `${formatSingleDate(start)}~${formatSingleDate(end)}`;
  }

  return formatSingleDate(date);

  function formatSingleDate(d) {
    if (d.length === 8) {
      return `${d.slice(4,6)}/${d.slice(6,8)}`; // MM/DD
    }
    return d; // 다른 형식 그대로 리턴
  }
};

const ScheduleItem = ({ name, text, done, date, categoryData, onToggle, onDelete }) => {
  const bgColor = categoryData?.bgColor || '#fff';
  const circleColor = categoryData?.circleColor || '#333';

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (window.confirm('이 일정을 삭제할까요?')) {
      onDelete();
    }
  };

  return (
    <div
      className="schedule-item"
      onContextMenu={handleContextMenu}
      onClick={onToggle}
      style={{
        backgroundColor: bgColor,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8))',
      }}
    >
      <div className="schedule-left">
        <div className="schedule-circle" style={{ backgroundColor: circleColor }} />
        <span className={`schedule-text ${done ? 'done' : ''}`}>{name}</span>
      </div>
      <span className="schedule-date" style={{ color: circleColor }}>
        {formatDateDisplay(date)}
      </span>
    </div>
  );
};

export default ScheduleItem;

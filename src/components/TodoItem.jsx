import React from 'react';
import '../styles/TodoItem.css';

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const parts = dateString.split(' ');
  const datePart = parts[0];
  const timePart = parts[1] || '';

  if (datePart.length !== 8) return dateString; // 형식이 이상할 경우 원본 리턴

  const month = datePart.slice(4, 6);
  const day = datePart.slice(6, 8);

  return `~${month}/${day} ${timePart}`;
};

const TodoItem = ({ text, done, date, onToggle, categoryData, onDelete }) => {
  const bgColor = categoryData?.bgColor || '#fff';
  const circleColor = categoryData?.circleColor || '#333';
  const formattedDate = formatDate(date);

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (window.confirm('이 할 일을 삭제할까요?')) {
      onDelete();
    }
  };

  return (
    <div
      className="todo-item"
      onContextMenu={handleContextMenu}
      style={{
        backgroundColor: bgColor,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85))',
      }}
    >
      <div className="todo-left">
        <div
          className={`todo-square ${done ? 'filled' : ''}`}
          style={{ borderColor: circleColor, backgroundColor: done ? circleColor : 'transparent' }}
          onClick={onToggle}
        />
        <span className={`todo-text ${done ? 'done' : ''}`}>{text}</span>
      </div>
      <span className="todo-date" style={{ color: circleColor }}>
        {formattedDate}
      </span>
    </div>
  );
};


export default TodoItem;

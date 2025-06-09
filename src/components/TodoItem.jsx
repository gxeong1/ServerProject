import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ text, done, date, onToggle }) => {
  return (
    <div className="todo-item">
      <div className="todo-left">
        <button
          onClick={onToggle}
          className={`todo-square ${done ? 'filled' : ''}`}
        ></button>
        <span className={`todo-text ${done ? 'done' : ''}`}>{text}</span>
      </div>
      <span className="todo-date">{date}</span>
    </div>
  );
};

export default TodoItem;

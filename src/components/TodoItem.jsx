import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

const TodoItem = ({ text, date, done, onToggle }) => {
  return (
    <div
      className={`flex justify-between items-center rounded-md px-3 py-1 my-1 text-sm
        ${done ? 'bg-green-100 text-gray-400' : 'bg-red-100 text-black'}`}
    >
      <div className="flex items-center gap-2">
        <button onClick={onToggle}>
          {done ? <CheckSquare className="text-green-500" size={18} /> : <Square className="text-red-500" size={18} />}
        </button>
        <span>{text}</span>
      </div>
      <span className="text-red-400">{date}</span>
    </div>
  );
};

export default TodoItem;

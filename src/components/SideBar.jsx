// components/Sidebar.jsx
import React from 'react';
import ScheduleItem from './ScheduleItem';
import TodoItem from './TodoItem';

const Sidebar = () => {
  const schedules = [
    { text: '기획', date: '5/2~5/4', color: 'red' },
    { text: '회의', date: '5/2~5/4', color: 'purple' },
    { text: '회의', date: '5/2~5/4', color: 'purple' },
    { text: '회의', date: '5/2~5/4', color: 'purple' },
  ];

  const todos = [
    { id: 1, text: '프론트엔드 개발', date: '5/2~5/4', done: false },
    { id: 2, text: '프론트엔드 개발', date: '5/2~5/4', done: true },
  ];

  return (
    <div className="w-64 bg-sky-50 h-screen p-4 overflow-y-auto">
      <h2 className="text-lg font-bold text-sky-700 mb-2">일정</h2>
      {schedules.map((s, i) => (
        <ScheduleItem key={i} text={s.text} date={s.date} color={s.color} />
      ))}

      <h2 className="text-lg font-bold text-sky-700 mt-6 mb-2">할 일</h2>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          date={todo.date}
          done={todo.done}
          onToggle={() => {}}
        />
      ))}
    </div>
  );
};

export default Sidebar;

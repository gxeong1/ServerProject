import React, { useState } from 'react';
import TodoItem from './TodoItem';
import ScheduleItem from './ScheduleItem';

const Sidebar = () => {
  const [todos, setTodos] = useState([
    { text: '집', done: false, date: '5/12~5/24' },
    { text: '학원', done: false, date: '5/18' },
  ]);

  const [schedules, setSchedules] = useState([
    { text: '회의', done: false, date: '6/10' },
    { text: '운동', done: false, date: '6/11~6/15' },
  ]);

  const toggleTodoDone = (index) => {
    const updated = todos.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTodos(updated);
  };

  const toggleScheduleDone = (index) => {
    const updated = schedules.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setSchedules(updated);
  };

  return (
    <div className="sidebar">
      <h2>Todo List</h2>
      {todos.map((todo, index) => (
        <TodoItem
          key={`todo-${index}`}
          text={todo.text}
          done={todo.done}
          date={todo.date}
          onToggle={() => toggleTodoDone(index)}
        />
      ))}

      <h2>Schedule List</h2>
      {schedules.map((schedule, index) => (
        <ScheduleItem
          key={`schedule-${index}`}
          text={schedule.text}
          done={schedule.done}
          date={schedule.date}
          onToggle={() => toggleScheduleDone(index)}
        />
      ))}
    </div>
  );
};

export default Sidebar;

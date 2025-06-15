import React from 'react';
import TodoItem from './TodoItem';
import ScheduleItem from './ScheduleItem';
import Popup from './PopUp';
import TodoPopup from './TodoPopup';
import '../styles/SideBar.css';
import '../styles/ScheduleItem.css';

const Sidebar = ({ categories, setCategories, schedules, setSchedules, todos, setTodos }) => {
  // ✅ 일정 완료 토글
  const toggleScheduleDone = (index) => {
    const updated = schedules.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setSchedules(updated);
  };

  // ✅ 일정 삭제
  const deleteSchedule = (index) => {
    setSchedules(prev => prev.filter((_, i) => i !== index));
  };

  // ✅ 할 일 완료 토글
  const toggleTodoDone = (index) => {
    const updated = todos.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTodos(updated);
  };

  // ✅ 할 일 삭제
  const deleteTodo = (index) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  // ✅ 할 일 추가
  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [
      ...prev,
      {
        text: newTodo.name,
        done: false,
        date: `${newTodo.endDate} ${newTodo.endTime}`,
        category: newTodo.category,
      },
    ]);
  };

  // ✅ 일정 추가
  const handleAddSchedule = (newSchedule) => {
    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now(), // 고유 ID 생성
        text: newSchedule.name, 
        done: false,
        date:
        newSchedule.startDate === newSchedule.endDate
          ? newSchedule.startDate
          : `${newSchedule.startDate}~${newSchedule.endDate}`,
        startDate: newSchedule.startDate,
        endDate: newSchedule.endDate,
        category: newSchedule.category,
      },
    ]);
  };

  return (
    <div className="sidebar">
      <img 
        className="logo-icon"
        src="/icon/Icon3.svg"
        alt="Logo"
        onClick={() => (window.location.href = "/")}/>
      {/* 일정 섹션 */}
      <div className='plus'>
        <h2>일정</h2>
        <Popup
          categories={categories}
          setCategories={setCategories}
          onSave={handleAddSchedule}
        />
      </div>
      <div className="divider" />
      <div className='schedule-container'>
      {schedules.map((schedule, index) => {
        const categoryData = categories.find(c => c.name === schedule.category) || {};
        return (
          <ScheduleItem
          key={`schedule-${index}`}
          name={schedule.text}
          done={schedule.done}
          date={schedule.date}
          categoryData={categoryData}
          onToggle={() => toggleScheduleDone(index)}
          onDelete={() => deleteSchedule(index)}
          />
        );
      })}
      </div>

      {/* 할 일 섹션 */}
      <div className='plus'>
        <h2>할 일</h2>
        <TodoPopup
          onSave={handleAddTodo}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="divider" />
      <div className='todo-container'>
      {todos.map((todo, index) => {
        const categoryData = categories.find(c => c.name === todo.category) || {};
        return (
          <TodoItem
            key={`todo-${index}`}
            text={todo.text}
            done={todo.done}
            date={todo.date}
            categoryData={categoryData}
            onToggle={() => toggleTodoDone(index)}
            onDelete={() => deleteTodo(index)}
          />
        );
      })}
      </div>
    </div>
  );
};

export default Sidebar;

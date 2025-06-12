import { useState } from 'react';
import CalendarComponents from '../components/CalendarComponents';
import Sidebar from '../components/Sidebar';
import Popup from '../components/Popup';
import predefinedColors from '../data/color';

const MainPage = () => {
  // 카테고리 상태 공유
  const [categories, setCategories] = useState([
    { name: '일반', ...predefinedColors[0] },
    { name: '업무', ...predefinedColors[1] },
    { name: '개인', ...predefinedColors[2] },
    { name: '기타', ...predefinedColors[3] }
  ]);

  // 일정 목록 상태
  const [schedules, setSchedules] = useState([
    { text: '회의', done: false, date: '6/10', category: '업무' },
    { text: '운동', done: false, date: '6/11~6/15', category: '개인' },
  ]);

  // 할 일 목록 상태
  const [todos, setTodos] = useState([
    { text: '집', done: false, date: '5/12~5/24', category: '일반' },
    { text: '학원', done: false, date: '5/18', category: '기타' },
  ]);

  // 일정 추가 핸들러
  const handleAddSchedule = (newSchedule) => {
    const formatDate = (dateString) => {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      return `${month}/${day}`;
    };

    const formattedStart = formatDate(newSchedule.startDate);
    const formattedEnd = formatDate(newSchedule.endDate);

    const dateDisplay =
      newSchedule.startDate === newSchedule.endDate
        ? formattedStart
        : `${formattedStart}~${formattedEnd}`;

    const scheduleItem = {
      text: newSchedule.name,
      done: false,
      date: dateDisplay,
      category: newSchedule.category || '일반',
    };

    setSchedules(prev => [...prev, scheduleItem]);

    // 새 카테고리가 없으면 자동 추가
    if (!categories.find(c => c.name === scheduleItem.category)) {
      const newCat = { name: scheduleItem.category, ...predefinedColors[0] };
      setCategories(prev => [...prev, newCat]);
    }
  };

  // 할 일 추가 핸들러
  const handleAddTodo = (newTodo) => {
    const formatDate = (dateString) => {
      if (!/^\d{8}$/.test(dateString)) return dateString;
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      return `${month}/${day}`;
    };

    const formattedDate = formatDate(newTodo.endDate);

    const todoItem = {
      text: newTodo.name,
      done: false,
      date: formattedDate,
      category: newTodo.category || '일반',
    };

    setTodos(prev => [...prev, todoItem]);

    // 새 카테고리 자동 추가
    if (!categories.find(c => c.name === todoItem.category)) {
      const newCat = { name: todoItem.category, ...predefinedColors[0] };
      setCategories(prev => [...prev, newCat]);
    }
  };

  return (
    <div>
      {/* 일정 생성 팝업 */}
      <Popup
        onSave={handleAddSchedule}
        categories={categories}
        setCategories={setCategories}
      />

      {/* 사이드바에 할 일 추가 핸들러 전달 */}
      <Sidebar
        categories={categories}
        setCategories={setCategories}
        schedules={schedules}
        setSchedules={setSchedules}
        todos={todos}
        setTodos={setTodos}
        onAddTodo={handleAddTodo}
      />

      {/* 캘린더 컴포넌트 */}
      <CalendarComponents />
    </div>
  );
};

export default MainPage;

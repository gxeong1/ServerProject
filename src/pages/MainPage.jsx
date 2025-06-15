import { useState } from 'react';
import CalendarComponents from '../components/CalendarComponents';
import Sidebar from '../components/Sidebar';
import Popup from '../components/Popup';
import predefinedColors from '../data/color';

const MainPage = () => {
  const [categories, setCategories] = useState([
    { name: '일반', ...predefinedColors[0] },
    { name: '업무', ...predefinedColors[1] },
    { name: '개인', ...predefinedColors[2] },
    { name: '기타', ...predefinedColors[3] }
  ]);

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      text: '회의',
      done: false,
      date: '6/10',
      startDate: '20250610',
      endDate: '20250610',
      category: '업무'
    },
    {
      id: 2,
      text: '운동',
      done: false,
      date: '6/11~6/13',
      startDate: '20250611',
      endDate: '20250613',
      category: '개인'
    },
  ]);

  const [todos, setTodos] = useState([
    { text: '집', done: false, date: '5/12~5/24', category: '일반' },
    { text: '학원', done: false, date: '5/18', category: '기타' },
  ]);

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
      id: Date.now(), // 고유 ID 부여
      name: newSchedule.name,
      done: false,
      date: dateDisplay,
      startDate: newSchedule.startDate,
      endDate: newSchedule.endDate,
      category: newSchedule.category || '일반',
    };

    setSchedules(prev => [...prev, scheduleItem]);

    if (!categories.find(c => c.name === scheduleItem.category)) {
      const newCat = { name: scheduleItem.category, ...predefinedColors[0] };
      setCategories(prev => [...prev, newCat]);
    }
  };

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

    if (!categories.find(c => c.name === todoItem.category)) {
      const newCat = { name: newTodo.category, ...predefinedColors[0] };
      setCategories(prev => [...prev, newCat]);
    }
  };

  return (
    <div>
      <Popup
        onSave={handleAddSchedule}
        categories={categories}
        setCategories={setCategories}
      />

      <Sidebar
        categories={categories}
        setCategories={setCategories}
        schedules={schedules}
        setSchedules={setSchedules}
        todos={todos}
        setTodos={setTodos}
        onAddTodo={handleAddTodo}
      />

      <CalendarComponents
        schedules={schedules}
        categories={categories}
      />
    </div>
  );
};

export default MainPage;

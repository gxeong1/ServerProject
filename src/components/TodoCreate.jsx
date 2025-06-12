import React, { useState, useEffect } from 'react';
import '../styles/ScheduleCreate.css';
import CreateButton from './CreateButton';
import CategoryCreatePopup from './CategoryCreatePopup';

const TodoCreate = ({ onSave, categories, setCategories }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories?.[0]?.name || '일반');
  const [endTime, setEndTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [memo, setMemo] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // 카테고리 변경 감지 시 초기 선택값 동기화
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].name);
    }
  }, [categories]);

  const handleSave = () => {
    const datePattern = /^\d{8}$/;
    const timePattern = /^\d{2}:\d{2}$/;

    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!datePattern.test(endDate)) {
      alert('날짜는 YYYYMMDD 형식이어야 합니다.');
      return;
    }

    if (!timePattern.test(endTime)) {
        alert('시간은 hh:mm 형식이어야 합니다.');
        return;
      }

    const newSchedule = {
      name,
      category,
      endDate,
      endTime,
      memo,
    };

    console.log('저장할 일정:', newSchedule);

    if (onSave) {
      onSave(newSchedule);
    }

    setName('');
    setCategory(categories?.[0]?.name || '일반');
    setEndDate('');
    setEndTime('');
    setMemo('');
  };

  return (
    <div className="schedule-create-container">
      <h2>할 일 생성</h2>
      <div className="form-group">
        <label>이름</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="할 일의 이름을 입력하세요"
        />
      </div>
      <div className="form-group">
        <label>카테고리</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories?.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <CreateButton onClick={() => setShowPopup(true)} />
        </div>
      </div>

      {showPopup && (
        <CategoryCreatePopup
          categories={categories}
          setCategories={setCategories}
          onClose={() => setShowPopup(false)}
          onAddCategory={(newCategory) => {
            setCategories([...categories, newCategory]);
            setCategory(newCategory.name);
            setShowPopup(false);
          }}
        />
      )}

      <div className="form-group">
        <label>마감 일자</label>
        <input
          type="text"
          maxLength={8}
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          placeholder="종료 일자를 'YYYYMMDD'처럼 입력해주세요"
        />
        <input
          type="text"
          maxLength={5}
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          placeholder="종료 시간을 '23:59'처럼 입력해 주세요"
        />
      </div>
      <div className='form-group'>
        <label>메모</label>
        <input
          type='text'
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder='상세사항을 메모할 수 있어요'
        />
      </div>
      <div className="button-group">
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default TodoCreate;

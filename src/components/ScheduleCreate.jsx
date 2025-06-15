import React, { useState, useEffect } from 'react';
import CreateButton from './CreateButton';
import CategoryCreatePopup from './CategoryCreatePopup';

const ScheduleCreate = ({ onSave, categories, setCategories }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories?.[0]?.name || '일반');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [memo, setMemo] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].name);
    }
  }, [categories]);

  const handleSave = () => {
    const datePattern = /^\d{8}$/;
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!datePattern.test(startDate) || !datePattern.test(endDate)) {
      alert('날짜는 YYYYMMDD 형식이어야 합니다.');
      return;
    }

    const newSchedule = {
      id: Date.now(),
      name,
      category,
      startDate,
      endDate,
      memo,
    };

    if (onSave) {
      onSave(newSchedule);
    }

    setName('');
    setCategory(categories?.[0]?.name || '일반');
    setStartDate('');
    setEndDate('');
    setMemo('');
  };

  return (
    <div className="schedule-create-container">
      <h2>일정 생성</h2>
      <div className="form-group">
        <label>이름</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="일정 이름을 입력하세요"
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
        <label>기간</label>
        <input
          type="text"
          maxLength={8}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          placeholder="시작 일자를 'YYYYMMDD'처럼 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label className='date_text'>~</label>
        <input
          type="text"
          maxLength={8}
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          placeholder="종료 일자를  'YYYYMMDD'처럼 입력해주세요"
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

export default ScheduleCreate;

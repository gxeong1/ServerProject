import React, { useState } from 'react';
import '../styles/ScheduleCreate.css'

const ScheduleCreate = ({ onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('일반');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    onSave({
      name,
      category,
      startDate,
      endDate,
    });
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
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="일반">일반</option>
          <option value="업무">업무</option>
          <option value="개인">개인</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="form-group">
        <label>기간</label>
        <input
          type="text"
          maxLength={8}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          placeholder="시작 일자를 '18990624'처럼 입력해주세요"
        />
      </div>

      <div className="form-group">
        <label className='date_text'>~</label>
        <input
          type="text"
          maxLength={8}
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          placeholder="종료 일자를 '18990624'처럼 입력해주세요"
        />
      </div>

      <div className="button-group">
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default ScheduleCreate;

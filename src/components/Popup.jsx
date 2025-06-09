import React, { useState, useRef, useEffect } from 'react';
import CreateButton from './CreateButton';
import ScheduleCreate from './ScheduleCreate';

const Popup = () => {
  const [showForm, setShowForm] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);

  const handleSave = (data) => {
    console.log('저장된 일정:', data);
    setShowForm(false);
  };

  return (
    <div className="schedule-popup">
      <CreateButton onClick={() => setShowForm(true)} />
      {showForm && (
        <div className="popup-position" ref={wrapperRef}>
          <ScheduleCreate onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default Popup;

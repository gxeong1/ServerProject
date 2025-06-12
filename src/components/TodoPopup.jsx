import React, { useState, useRef, useEffect } from 'react';
import CreateButton from './CreateButton';
import '../styles/Popup.css';
import TodoCreate from './TodoCreate';

const TodoPopup = ({ onSave, categories, setCategories }) => {
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
    if (onSave) {
      onSave(data);
    }
    setShowForm(false);
  };

  return (
    <div className="popup-wrapper" style={{ position: 'relative' }} ref={wrapperRef}>
      <CreateButton onClick={() => setShowForm(true)} />
      {showForm && (
        <div className="popup-position">
          <TodoCreate
            onSave={handleSave}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      )}
    </div>
  );
};

export default TodoPopup;

import React, { useState, useEffect, useRef } from 'react';
import '../styles/CategoryCreatePopup.css';
import predefinedColors from '../data/color';

const CategoryCreatePopup = ({ onClose, onAddCategory }) => {
  const [name, setName] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const popupRef = useRef(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('카테고리명을 입력하세요');
      return;
    }
    const selected = predefinedColors[selectedColorIndex];
    onAddCategory({ name, ...selected });
    setName('');
    setSelectedColorIndex(0);
    onClose();
  };

  // 팝업 외부 클릭 시 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="category-popup-backdrop">
      <div className="category-popup" ref={popupRef}>
        <input
          type="text"
          placeholder="카테고리명"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="color-options">
          {predefinedColors.map((color, idx) => (
            <button
              key={color.label}
              onClick={() => setSelectedColorIndex(idx)}
              style={{
                background: color.bgColor,
                border: idx === selectedColorIndex ? '2px solid black' : '1px solid gray'
              }}
              title={color.label}
            />
          ))}
        </div>
        <div className="popup-actions">
          <button onClick={handleSubmit}>저장</button>
          {/* 취소 버튼 삭제 */}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreatePopup;

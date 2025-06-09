import React from 'react';

const CreateButton = ({ onClick }) => {
  return (
      <img src="/icon/plusIcon.svg" alt="일정 생성 버튼" onClick={onClick}/>
  );
};

export default CreateButton;

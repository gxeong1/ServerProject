import React from 'react';

const ScheduleItem = ({ text, date, color = 'purple' }) => {
  return (
    <div className="flex justify-between items-center bg-purple-100 rounded-md px-3 py-1 my-1 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
        <span>{text}</span>
      </div>
      <span className="text-purple-400">{date}</span>
    </div>
  );
};

export default ScheduleItem;

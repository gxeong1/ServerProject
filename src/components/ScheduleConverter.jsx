import React, { useMemo } from 'react';

const ScheduleConverter = ({ rawSchedules, categoryData, children }) => {
  const convertedSchedules = useMemo(() => {
    const parseDate = (str) => {
      const y = str.slice(0, 4);
      const m = str.slice(4, 6);
      const d = str.slice(6, 8);
      return new Date(`${y}-${m}-${d}T00:00:00`); // ISO 8601 형식
    };

    return rawSchedules.map(item => ({
      id: item.id,
      text: item.text || item.name,
      done: false,
      category: item.category,
      start: parseDate(item.startDate),
      end: parseDate(item.endDate),
      memo: item.memo,
      categoryColor: categoryData[item.category]?.bgColor || '#ccc',
    }));
  }, [rawSchedules, categoryData]);

  return children(convertedSchedules);
};

export default ScheduleConverter;

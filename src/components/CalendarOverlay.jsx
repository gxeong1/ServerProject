import { useEffect, useState } from 'react';

const CalendarOverlay = ({ schedules = [], categories = [], calendarRef }) => {
  const [positions, setPositions] = useState([]);

  const getCategoryColors = (categoryName) => {
    const cat = categories.find(c => c.name === categoryName);
    return cat || { bgColor: '#ccc', circleColor: '#999' };
  };

  // 날짜 하루 보정 (-1일 처리)
  const parseDate = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return null;
    const y = parseInt(yyyymmdd.slice(0, 4), 10);
    const m = parseInt(yyyymmdd.slice(4, 6), 10) - 1;
    const d = parseInt(yyyymmdd.slice(6, 8), 10);
    return new Date(y, m, d - 1);
  };

  const getDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  const diffDays = (start, end) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((end - start) / msPerDay);
  };

  useEffect(() => {
    if (!calendarRef?.current) return;

    const timer = setTimeout(() => {
      const tiles = calendarRef.current.querySelectorAll('[data-date]');
      const map = {};
      tiles.forEach(tile => {
        const yyyymmdd = tile.getAttribute('data-date');
        if (yyyymmdd) {
          map[yyyymmdd] = tile.getBoundingClientRect();
        }
      });

      const containerRect = calendarRef.current.getBoundingClientRect();
      const tileWidth = 130;
      const rowHeight = 18;

      const placed = [];

      const updated = schedules.map((item, idx) => {
        const start = parseDate(item.startDate);
        const end = parseDate(item.endDate);
        if (!start || !end) return null;

        const startKey = getDateString(start);
        const endKey = getDateString(end);
        const startBox = map[startKey];
        const endBox = map[endKey];
        if (!startBox || !endBox) return null;

        const dayCount = diffDays(start, end) + 1;
        const width = tileWidth * dayCount;
        const left = startBox.left - containerRect.left - 8;

        // 겹침 검사
        let rowIndex = 0;
        while (true) {
          const overlapping = placed.some(p =>
            p.rowIndex === rowIndex &&
            !(left + width <= p.left || p.left + p.width <= left)
          );
          if (!overlapping) break;
          rowIndex++;
        }

        const top = startBox.top - containerRect.top + 8 + rowIndex * rowHeight;
        placed.push({ left, width, rowIndex });

        return {
          id: item.id,
          text: item.text || item.name || '(제목 없음)',
          category: item.category,
          top,
          left,
          width,
          zIndex: 10 + rowIndex,
          opacity: 0.85,
        };
      }).filter(Boolean);

      setPositions(updated);
    }, 10);

    return () => clearTimeout(timer);
  }, [schedules, categories]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {positions.map(({ id, text, category, top, left, width, zIndex, opacity }) => {
        const colors = getCategoryColors(category);
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              top,
              left,
              width,
              height: '16px',
              backgroundColor: colors.bgColor,
              borderRadius: '8px',
              padding: '0 8px',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: 'Pretendard Variable',
              color: '#000',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              userSelect: 'none',
              pointerEvents: 'none',
              boxSizing: 'border-box',
              cursor: 'default',
              opacity,
              zIndex,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8))',
            }}
            title={text}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                marginRight: '4px',
                marginLeft: '-2px',
                backgroundColor: colors.circleColor,
                flexShrink: 0,
              }}
            />
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarOverlay;

// 날짜 포맷터 - '20250609' → '6/9'
export const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return '';
    const month = parseInt(dateString.slice(4, 6), 10);
    const day = parseInt(dateString.slice(6, 8), 10);
    return `${month}/${day}`;
  };
  
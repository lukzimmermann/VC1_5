export const hoursToString = (hour) => {
  if (hour > 9) return hour + ':00';
  else return '0' + hour + ':00';
};

export const monthToString = (month) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month];
};

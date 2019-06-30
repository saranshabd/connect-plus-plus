export const monthDays = () => {
  let days = [];
  for (let i = 1; i <= 31; ++i) days.push(i);
  return days;
};

export const years = () => {
  let currYear = new Date().getFullYear();
  let years = [currYear];
  for (let i = 1; i < 10; ++i) years.push(currYear - i);
  return years;
};

export const monthNames = () => {
  return [
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
    'December'
  ];
};

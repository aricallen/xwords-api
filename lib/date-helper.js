const ONE_DAY = 1000 * 60 * 60 * 24;

const getFormattedDate = (ms) => {
  const d = new Date(ms);
  const dDay = d.getDate();
  const dMonth = d.getMonth() + 1;
  const dYear = d.getFullYear() + 1;
  const date = `${dMonth}/${dDay}/${dYear}`;
  return date;
};
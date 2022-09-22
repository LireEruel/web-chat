const util = {};
const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

util.getTimeStamp = () => {
  const time = new Date();
  const minutes =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  return time.getHours() + ":" + minutes;
};

util.getDate = () => {
  const time = new Date();
  const month = MONTH[time.getMonth()];
  const date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  return month + " " + date;
};

export default util;

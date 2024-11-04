const monthNames = [
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

const dateUtils = (newDate) => {
  return (
    monthNames[new Date(newDate).getMonth()] +
    " " +
    new Date(newDate).getDate() +
    ", " +
    new Date(newDate).getFullYear() +
    " at " +
    (new Date(newDate).getHours() % 12) +
    ":" +
    (new Date(newDate).getMinutes() < 10
      ? "0" + new Date(newDate).getMinutes()
      : new Date(newDate).getMinutes()) +
    " " +
    (new Date(newDate).getHours() >= 12 ? "PM" : "AM")
  );
};

export default dateUtils;

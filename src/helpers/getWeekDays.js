function getWeekDay(date) {
  let day = new Date(date); // 3 января 2014 года
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day.getDay()];
}

export default getWeekDay;

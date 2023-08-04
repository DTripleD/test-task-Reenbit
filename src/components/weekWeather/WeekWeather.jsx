import { useEffect } from "react";
import { getWeekWeather } from "../../services/api";
import "./WeekWeather.css";
import PropTypes from "prop-types";
import { formatRequestDate } from "../../helpers/formatDate";

const WeekWeather = ({ selectedCity }) => {
  console.log();
  const date = new Date(selectedCity.startTime);

  console.log(date.toISOString());
  useEffect(() => {
    getWeekWeather(
      selectedCity.name,
      formatRequestDate(selectedCity.startTime, "toPoints"),
      formatRequestDate(selectedCity.endTime, "toPoints")
    ).then((data) => console.log(data));
  }, [selectedCity.endTime, selectedCity.name, selectedCity.startTime]);

  console.log(selectedCity);
  return (
    <>
      <h2>Week</h2>
      <ul>
        <li></li>
      </ul>
    </>
  );
};

export default WeekWeather;

WeekWeather.propTypes = {
  selectedCity: PropTypes.object.isRequired,
};

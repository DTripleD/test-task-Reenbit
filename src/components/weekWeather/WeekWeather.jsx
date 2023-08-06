import { useEffect, useState } from "react";
import { getWeekWeather } from "../../services/api";
import "./WeekWeather.css";
import PropTypes from "prop-types";
import { formatRequestDate } from "../../helpers/formatDate";
import "./WeekWeather.css";
import getWeekDay from "../../helpers/getWeekDays";
import WeatherIcon from "../../img/WeatherIcon";

const WeekWeather = ({ selectedCity }) => {
  const [weekInfo, setWeekInfo] = useState(null);

  useEffect(() => {
    getWeekWeather(
      selectedCity.name,
      formatRequestDate(selectedCity.startTime),
      formatRequestDate(selectedCity.endTime)
    )
      .then((data) => setWeekInfo(data.days))
      .catch((e) => console.log(e));
  }, [selectedCity]);

  return (
    <>
      <h2>Week</h2>
      <ul className="days__container">
        {weekInfo &&
          weekInfo.map((day) => (
            <li key={day.datetimeEpoch}>
              <p>{getWeekDay(day.datetime)}</p>
              <div>
                <WeatherIcon code={day.icon} />
              </div>

              <p>
                {Math.round(day.tempmin)}°/{Math.round(day.tempmax)}°
              </p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default WeekWeather;

WeekWeather.propTypes = {
  selectedCity: PropTypes.object.isRequired,
};

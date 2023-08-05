import { useEffect, useState } from "react";
import { getWeekWeather } from "../../services/api";
import "./WeekWeather.css";
import PropTypes from "prop-types";
import { formatRequestDate } from "../../helpers/formatDate";
// import svgIcons from "../../img/icons/svgIcons";
import fog from "../../img/icons/rain.png";
import "./WeekWeather.css";
import getWeekDay from "../../helpers/getWeekDays";

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

  // const iconsMap = {
  //   snow: svgIcons.snow,
  //   "snow-showers-day": svgIcons.snow,
  //   "snow-showers-night": svgIcons.snow,
  //   "thunder-rain": svgIcons.thunderstorms,
  //   "thunder-showers-day": svgIcons.stormyShowers,
  //   "thunder-showers-night": svgIcons.stormyShowers,
  //   rain: svgIcons.rain,
  //   "showers-day": svgIcons.sprinkle,
  //   "showers-night": svgIcons.sprinkle,
  //   fog: svgIcons.fog,
  //   wind: svgIcons.sunny,
  //   cloudy: svgIcons.cloudy,
  //   "partly-cloudy-day": svgIcons.cloudy,
  //   "partly-cloudy-night": svgIcons.cloudy,
  //   "clear-day": svgIcons.clearDay,
  //   "clear-night": svgIcons.sunny,
  // };

  // const getIcon = (name) => {
  //   if (iconsMap[name]) {
  //     return iconsMap[name];
  //   }
  //   return svgIcons.sunny;
  // };

  return (
    <>
      <h2>Week</h2>
      <ul className="days__container">
        {weekInfo === null ? (
          <h2>Loading</h2>
        ) : (
          weekInfo.map((day) => (
            <li key={day.datetimeEpoch}>
              <p>{getWeekDay(day.datetime)}</p>
              <div>
                <img src={fog} alt="A" width="50" height="50" />
              </div>

              <p>
                {Math.round(day.tempmin)}°/{Math.round(day.tempmax)}°
              </p>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default WeekWeather;

WeekWeather.propTypes = {
  selectedCity: PropTypes.object.isRequired,
};

import "./TodayWeather.css";
import fog from "../../img/icons/rain.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getTodayWeather } from "../../services/api";
import getWeekDay from "../../helpers/getWeekDays";

const TodayWeather = ({ selectedCity }) => {
  const [temp, setTemp] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  function convertMs(time) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(time / day));
    const hours = addLeadingZero(Math.floor((time % day) / hour));
    const minutes = addLeadingZero(Math.floor(((time % day) % hour) / minute));
    const seconds = addLeadingZero(
      Math.floor((((time % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    getTodayWeather(selectedCity.name).then((data) =>
      setTemp(data.days[0].temp)
    );
  }, [selectedCity.name, setTemp]);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  const timeRemain = selectedCity.startTime - currentTime;

  const timee = convertMs(timeRemain);

  return (
    <div className="today__wrapper">
      <h2>{getWeekDay(currentTime)}</h2>
      <div className="temp">
        <img src={fog} alt="A" width="50" height="50" />
        <p className="temp__current">{Math.round(temp)}°C</p>
      </div>
      <p>{selectedCity.name}</p>

      <div>
        <ul className="time__list">
          <li>
            <span className="time">{timee.days}</span>
            <p className="time__text">days</p>
          </li>
          <li>
            <span className="time">{timee.hours}</span>
            <p className="time__text">hours</p>
          </li>
          <li>
            <span className="time">{timee.minutes}</span>
            <p className="time__text">minutes</p>
          </li>
          <li>
            <span className="time">{timee.seconds}</span>
            <p className="time__text">seconds</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TodayWeather;

TodayWeather.propTypes = {
  selectedCity: PropTypes.object.isRequired,
};

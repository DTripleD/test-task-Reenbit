import "./TodayWeather.css";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getTodayWeather } from "../../services/api";
import WeatherIcon from "../../img/WeatherIcon";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { getUser } from "../../redux/selectors";
import { convertMs, getWeekDay } from "../../helpers";

const TodayWeather = ({ selectedCity }) => {
  const [todayWeather, setTodayWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = useSelector(getUser);

  useEffect(() => {
    getTodayWeather(selectedCity.name).then((data) => {
      setTodayWeather(data.days[0]);
    });
  }, [selectedCity, setTodayWeather]);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    dispatch(setUser(userObject));
    document.getElementById("signInDiv").hidden = true;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "610818184483-pvc6qe0lc19ac9c4msb053cmlgl2vg19.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_black",
      size: "small",
      shape: "pill",
    });

    if (Object.keys(user).length === 0) {
      google.accounts.id.prompt();
      document.getElementById("signInDiv").hidden = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      document.getElementById("signInDiv").hidden = true;
    }
  }, [user]);

  const time = convertMs(selectedCity.startTime - currentTime);

  const handleSignOut = () => {
    dispatch(setUser({}));
    document.getElementById("signInDiv").hidden = false;
  };

  return (
    <div className="today__wrapper">
      <div className="user__wrapper">
        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <>
            <button onClick={(e) => handleSignOut(e)}>Sign out</button>
            <div>
              <img src={user.picture} alt={user.name} className="user__info" />
              <h3>{user.name}</h3>
            </div>
          </>
        )}
      </div>
      {todayWeather && (
        <>
          <h2 className="selected__city">{getWeekDay(currentTime)}</h2>
          <div className="temp">
            <WeatherIcon code={todayWeather?.icon} color="white" />
            <p className="temp__current">
              {todayWeather ? Math.round(todayWeather.temp) : 0}°C
            </p>
          </div>
          <p className="selected__city">{selectedCity.name}</p>

          <div>
            <ul className="time__list">
              <li>
                <span className="time">{time.days}</span>
                <p className="time__text">days</p>
              </li>
              <li>
                <span className="time">{time.hours}</span>
                <p className="time__text">hours</p>
              </li>
              <li>
                <span className="time">{time.minutes}</span>
                <p className="time__text">minutes</p>
              </li>
              <li>
                <span className="time">{time.seconds}</span>
                <p className="time__text">seconds</p>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TodayWeather;

TodayWeather.propTypes = {
  selectedCity: PropTypes.object.isRequired,
};

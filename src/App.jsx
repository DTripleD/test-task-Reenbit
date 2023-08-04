import { useState } from "react";
import "./App.css";
import Modal from "./components/modal/modal";
import Form from "./components/form/form";
import { nanoid } from "nanoid";
import staticData from "../../src/Data/data.json";
import CityList from "./components/cityList/CityList";
import WeekWeather from "./components/weekWeather/WeekWeather";

// API for getting forecast from - to for the city
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelin
// e/[city]/[date1]/[date2]?unitGroup=metric&include=days&key=YOUR_API_KEY&cont
// entType=json

// API for getting today’s weather for the city
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelin
// e/[city]/today?unitGroup=metric&include=days&key=YOUR_API_KEY&contentType=
// json

function App() {
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState({});

  const [selectedCity, setSelectedCity] = useState({});

  const [modalActive, setModalActive] = useState(false);

  const [trips, setTrips] = useState([
    {
      name: "Athens",
      imageUrl:
        "https://res.cloudinary.com/dj6mkr2e6/image/upload/v1690896299/athens_vmn2zj.webp",
      id: nanoid(),
      startTime: 1668545454550,
      endTime: 1685445855450,
    },
  ]);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const addCity = (name, startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);

    setTrips((prev) => [
      ...prev,
      {
        name,
        imageUrl: staticData.find((c) => c.name === name).imageUrl,
        id: nanoid(),
        startTime: new Date(startDate).getTime(),
        endTime: new Date(endDate).getTime(),
      },
    ]);
  };

  // useEffect(() => {
  //   fetch(
  //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
  //       city || "kyiv"
  //     }/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }, [city]);

  return (
    <>
      <h1>Weather Forecast</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCity(cityName);
        }}
      >
        <input
          type="text"
          placeholder="Search your trip"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Click</button>
      </form>

      <CityList
        trips={trips}
        setModal={setModalActive}
        setSelectedCity={setSelectedCity}
      />

      <WeekWeather selectedCity={selectedCity} />

      <Modal active={modalActive} setActive={setModalActive}>
        <Form setActive={setModalActive} addCity={addCity} />
      </Modal>
    </>
  );
}

export default App;

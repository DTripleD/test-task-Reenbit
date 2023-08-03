import { useState } from "react";
import "./App.css";
import Citys from "./components/citys";
import AddTripButton from "./components/addtripButton";
import Modal from "./components/modal/modal";
import Form from "./components/form/form";

// API for getting forecast from - to for the city
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelin
// e/[city]/[date1]/[date2]?unitGroup=metric&include=days&key=YOUR_API_KEY&cont
// entType=json

// API for getting today’s weather for the city
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelin
// e/[city]/today?unitGroup=metric&include=days&key=YOUR_API_KEY&contentType=
// json

const API_KEY = "54QNJPLCDHSMZMYJ75EUK7772";

function App() {
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState("");

  const [modalActive, setModalActive] = useState(false);

  const [trips, setTrips] = useState([]);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const addCity = (selectedCity, startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedCity}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
    )
      .then((res) => res.json())
      .then((data) => setTrips((prev) => [...prev, data]))
      .catch((error) => console.log(error));
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

      <Citys
        trips={trips}
        startDate={startDate}
        endDate={endDate}
        city={cityName}
      />
      <AddTripButton setModal={setModalActive} />
      <Modal active={modalActive} setActive={setModalActive}>
        <Form setActive={setModalActive} addCity={addCity} />
      </Modal>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Modal from "./components/modal/modal";
import Form from "./components/form/form";
import { nanoid } from "nanoid";

import WeekWeather from "./components/weekWeather/WeekWeather";
import TodayWeather from "./components/todayWeather/TodayWeather";
import FilterForm from "./components/filterForm/FilterForm";
import CityList from "./components/cityList/CityList";
import { useSelector } from "react-redux";
import { getFilter, getTrips } from "./redux/selectors";
import CityItem from "./components/cityItem/CityItem";

function App() {
  const [selectedCity, setSelectedCity] = useState({
    name: "Athens",
    imageUrl:
      "https://res.cloudinary.com/dj6mkr2e6/image/upload/v1690896299/athens_vmn2zj.webp",
    id: nanoid(),
    startTime: 1698145454550,
    endTime: 1698545554550,
  });

  const trips = useSelector(getTrips);

  const statusFilter = useSelector(getFilter);

  const getFilteredTrips = () => {
    return trips.filter((trip) => {
      return trip.name.toLowerCase().includes(statusFilter.toLowerCase());
    });
  };

  const filterElements = getFilteredTrips();

  const sortedCitysByDeparture = filterElements.sort(
    (a, b) => a.startTime - b.startTime
  );

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="app__wrapper">
      <div className="main__screen">
        <h1>
          <span className="logo__text">Weather</span> Forecast
        </h1>

        <FilterForm />
        <CityList setModal={setModalActive}>
          {sortedCitysByDeparture.map((trip) => (
            <CityItem
              key={trip.id}
              trip={trip}
              setSelectedCity={setSelectedCity}
            />
          ))}
        </CityList>

        <WeekWeather selectedCity={selectedCity} />
      </div>
      <TodayWeather selectedCity={selectedCity} />

      <Modal active={modalActive} setActive={setModalActive}>
        <Form setActive={setModalActive} />
      </Modal>
    </div>
  );
}

export default App;

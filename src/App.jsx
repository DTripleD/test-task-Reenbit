import { useState } from "react";
import "./App.css";
import Modal from "./components/modal/modal";
import Form from "./components/form/form";
import { nanoid } from "nanoid";

import CityList from "./components/cityList/CityList";
import WeekWeather from "./components/weekWeather/WeekWeather";
import TodayWeather from "./components/todayWeather/TodayWeather";
import FilterForm from "./components/filterForm/FilterForm";

function App() {
  const [selectedCity, setSelectedCity] = useState({
    city: "Athens",
    imageUrl:
      "https://res.cloudinary.com/dj6mkr2e6/image/upload/v1690896299/athens_vmn2zj.webp",
    id: nanoid(),
    startTime: 1698145454550,
    endTime: 1698545554550,
  });

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="app__wrapper">
      <div>
        <h1>
          <span className="logo__text">Weather</span> Forecast
        </h1>

        <FilterForm />

        <CityList setModal={setModalActive} setSelectedCity={setSelectedCity} />

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

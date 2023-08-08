import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import { nanoid } from "nanoid";
import WeekWeather from "./components/WeekWeather/WeekWeather";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import FilterForm from "./components/FilterForm/FilterForm";
import CityList from "./components/CityList/CityList";
import { useSelector } from "react-redux";
import { getFilter, getTrips } from "./redux/selectors";
import CityItem from "./components/CityItem/CityItem";

function App() {
  const [modalActive, setModalActive] = useState(false);
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

  return (
    <div className="app__wrapper">
      <div className="main__screen">
        <FilterForm />
        <CityList setModal={setModalActive}>
          {getFilteredTrips()
            .sort((a, b) => a.startTime - b.startTime)
            .map((trip) => (
              <CityItem
                key={trip.id}
                trip={trip}
                selectedCity={selectedCity}
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

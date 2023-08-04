import PropTypes from "prop-types";
import CityItem from "../cityItem/CityItem";

import "./CityList.css";
import AddTripButton from "../addTripButton/addtripButton";

const CityList = ({ trips, setModal, setSelectedCity }) => {
  return (
    <div className="list__wrapper">
      <ul className="city__container">
        {trips.map((trip) => (
          <CityItem
            key={trip.id}
            trip={trip}
            setSelectedCity={setSelectedCity}
          />
        ))}
      </ul>
      <AddTripButton setModal={setModal} />
    </div>
  );
};

export default CityList;

CityList.propTypes = {
  trips: PropTypes.array.isRequired,
  setModal: PropTypes.func.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

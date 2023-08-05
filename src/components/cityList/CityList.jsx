import PropTypes from "prop-types";
import CityItem from "../cityItem/CityItem";

import "./CityList.css";
import AddTripButton from "../addTripButton/addtripButton";
import { useSelector } from "react-redux";
import { getFilter, getTrips } from "../../redux/selectors";

const CityList = ({ setModal, setSelectedCity }) => {
  const trips = useSelector(getTrips);

  const statusFilter = useSelector(getFilter);

  const getFilteredTrips = () => {
    return trips.filter((trip) => {
      return trip.name.toLowerCase().includes(statusFilter.toLowerCase());
    });
  };

  const filterElements = getFilteredTrips();

  return (
    <div className="list__wrapper">
      <ul className="city__container">
        {filterElements.map((trip) => (
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
  setModal: PropTypes.func.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

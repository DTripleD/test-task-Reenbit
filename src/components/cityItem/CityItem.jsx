// import { nanoid } from "nanoid";
import { formatRequestDate } from "../../helpers/formatDate";
import "./CityItem.css";
import PropTypes from "prop-types";

const CityItem = ({ trip, setSelectedCity }) => {
  return (
    <>
      <li className="city__item"
        onClick={() =>
          setSelectedCity({
            name: trip.name,
            startTime: trip.startTime,
            endTime: trip.endTime,
          })
        }
      >
        <img src={trip.imageUrl} alt="City" className="cityImg" />

        <div className="tripInfo__containe">
          <h2>{trip.name}</h2>
          <p>
            {formatRequestDate(trip.startTime, "toPoints")} -
            {formatRequestDate(trip.endTime, "toPoints")}
          </p>
        </div>
      </li>
    </>
  );
};

export default CityItem;

CityItem.propTypes = {
  trip: PropTypes.object.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

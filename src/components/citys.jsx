import { nanoid } from "nanoid";
import "./citys.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Citys = ({ trips, startDate, endDate, cityName }) => {
  const [image, setImage] = useState("");
  const id = nanoid();

  const API_KEY = "34891295-3c871ab0268d353f15c88782f";

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?q=${cityName}&key=${API_KEY}&per_page=3&image_type=photo&orientation=horizontal`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => setImage(data.hits[0].previewURL));
  }, [cityName]);

  return (
    <div className="city__container">
      {trips.map((trip) => (
        <div key={id}>
          {console.log(trip)}
          <img src={image} alt="City" className="cityImg" />

          <div className="tripInfo__containe">
            <h2>{trip.address}</h2>
            <p>
              {startDate} - {endDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Citys;

Citys.propTypes = {
  trips: PropTypes.array.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  cityName: PropTypes.string,
};

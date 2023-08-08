import PropTypes from "prop-types";
import "./Form.css";
import { useEffect, useState } from "react";
import data from "../../data/data.json";
import { useDispatch } from "react-redux";
import { addCity } from "../../redux/tripsSlice";
import { formatDate } from "../../helpers";

const Form = ({ setActive }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(() => formatDate(currentTime));
  }, [currentTime]);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (startDate > endDate) {
      return alert("Select correct data");
    }

    if (startDate <= currentTime) {
      return alert("Please choose a date in the future");
    }

    const daysMaxStart =
      new Date(startDate).getTime() - new Date(currentTime).getTime();

    const daysMaxEnd =
      new Date(endDate).getTime() - new Date(currentTime).getTime();

    if (daysMaxStart >= 1296000000 || daysMaxEnd >= 1296000000) {
      return alert("The start and end date should be within the next 15 days");
    }

    dispatch(addCity({ city, startDate, endDate }));

    clearForm();
  };

  const clearForm = () => {
    setCity("");
    setStartDate("");
    setEndDate("");
    setActive(false);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="modal__header">
          <h2>Create trip</h2>
          <button
            type="button"
            onClick={() => {
              setActive(false);
              clearForm();
            }}
            className="close__button"
          >
            x
          </button>
        </div>

        <div className="input__block">
          <label>
            <div className="input__name">
              <span className="required">*</span>
              <p>City</p>
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input"
              required
            >
              <option value="">Please select a city</option>
              {data.map((c) => (
                <option key={c.id} value={c.city}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div className="input__name">
              <span className="required">*</span>
              <p>Start date</p>
            </div>
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              placeholder="Select date"
              required
            />
          </label>
          <label>
            <div className="input__name">
              <span className="required">*</span>
              <p>End date</p>
            </div>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              placeholder="Select date"
              required
            />
          </label>
        </div>
        <div className="modal__footer">
          <button onClick={() => setActive(false)} className="cancel">
            Cancel
          </button>
          <button type="submit" className="save">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

Form.propTypes = {
  setActive: PropTypes.func.isRequired,
};

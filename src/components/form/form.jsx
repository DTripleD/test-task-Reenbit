import PropTypes from "prop-types";
import "./form.css";
import { useState } from "react";
import data from "../../data/data.json";

const Form = ({ setActive, addCity }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (startDate > endDate) {
      return alert("Select correct data");
    }

    addCity(city, startDate, endDate);

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
          <button type="button" onClick={() => setActive(false)}>
            x
          </button>
        </div>

        <div className="input__block">
          <label>
            <div className="input__name">
              <span className="required">*</span>
              <p>City</p>
            </div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
              list="cities"
              placeholder="Please select a city"
              required
            />
            <datalist id="cities">
              {data.map((m) => (
                <option value={m.name} key={m.id} />
              ))}
            </datalist>
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
          <button onClick={() => setActive(false)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default Form;

Form.propTypes = {
  setActive: PropTypes.func.isRequired,
  addCity: PropTypes.func.isRequired,
};

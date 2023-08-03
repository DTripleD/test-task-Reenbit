import PropTypes from "prop-types";
import "./form.css";
import { useState } from "react";

const Form = ({ setActive, addCity }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          addCity(city, startDate, endDate);

          setCity("");
          setStartDate("");
          setEndDate("");
          setActive(false);
        }}
      >
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
              <option value="Naples" />
              <option value="London" />
              <option value="Berlin" />
              <option value="New York" />
              <option value="Frattamaggiore" />
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

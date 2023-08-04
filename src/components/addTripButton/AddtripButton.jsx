import PropTypes from "prop-types";
import "./AddTripButton.css";

const AddTripButton = ({ setModal }) => {
  return (
    <button onClick={() => setModal(true)} className="add__button">
      +<br />
      Add trip
    </button>
  );
};

export default AddTripButton;

AddTripButton.propTypes = {
  setModal: PropTypes.func.isRequired,
};

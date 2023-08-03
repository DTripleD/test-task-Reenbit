import PropTypes from "prop-types";

const AddTripButton = ({ setModal }) => {
  return (
    <button onClick={() => setModal(true)}>
      +<br />
      Add trip
    </button>
  );
};

export default AddTripButton;

AddTripButton.propTypes = {
  setModal: PropTypes.func.isRequired,
};

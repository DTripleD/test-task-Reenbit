import { useEffect } from "react";
import "./modal.css";
import PropTypes from "prop-types";

const Modal = ({ active, setActive, children }) => {
  useEffect(() => {
    const handleEscape = ({ code }) => {
      code === `Escape` && setActive(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setActive]);

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Modal;

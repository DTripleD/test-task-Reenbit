import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import debounce from "lodash.debounce";
import "./CityList.css";
import AddTripButton from "../AddTripButton/AddTripButton";
import PropTypes from "prop-types";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

const CityList = ({ children, setModal }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const containerRef = useRef(null);

  const checkForScrollPosition = () => {
    const { current } = containerRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };

  const scrollContainerBy = (distance) =>
    containerRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = containerRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounce(checkForScrollPosition, 200));

    return () => {
      current?.removeEventListener(
        "scroll",
        debounce(checkForScrollPosition, 200)
      );
      debounce(checkForScrollPosition, 200).cancel();
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="scroll__container">
        <ul className="list" ref={containerRef}>
          {children}
        </ul>
        <button
          type="button"
          disabled={!canScrollLeft}
          onClick={() => scrollContainerBy(-400)}
          className={cn("button", "button__left", {
            button__hidden: !canScrollLeft,
          })}
        >
          <AiFillStepBackward />
        </button>
        <button
          type="button"
          disabled={!canScrollRight}
          onClick={() => scrollContainerBy(400)}
          className={cn("button", "button--right", {
            button__hidden: !canScrollRight,
          })}
        >
          <AiFillStepForward />
        </button>
        {canScrollLeft ? (
          <div className="shadow__wrapper shadow__wrapper--left">
            <div className="shadow shadow--left" />
          </div>
        ) : null}
        {canScrollRight ? (
          <div className="shadow__wrapper shadow__wrapper--right">
            <div className="shadow shadow--right" />
          </div>
        ) : null}
      </div>
      <AddTripButton setModal={setModal} />
    </div>
  );
};

export default CityList;

CityList.propTypes = {
  setModal: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

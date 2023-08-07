import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import debounce from "lodash.debounce";
import "./CityList.css";
import AddTripButton from "../addTripButton/addtripButton";
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

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance) =>
    containerRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = containerRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, [debounceCheckForScrollPosition]);

  return (
    <div className="wrapper">
      <div className="scrollContainer">
        <ul className="list" ref={containerRef}>
          {children}
        </ul>
        <button
          type="button"
          disabled={!canScrollLeft}
          onClick={() => scrollContainerBy(-400)}
          className={cn("button", "buttonLeft", {
            "button--hidden": !canScrollLeft,
          })}
        >
          <AiFillStepBackward />
        </button>
        <button
          type="button"
          disabled={!canScrollRight}
          onClick={() => scrollContainerBy(400)}
          className={cn("button", "buttonRight", {
            "button--hidden": !canScrollRight,
          })}
        >
          <AiFillStepForward />
        </button>
        {canScrollLeft ? (
          <div className="shadowWrapper leftShadowWrapper">
            <div className="shadow leftShadow" />
          </div>
        ) : null}
        {canScrollRight ? (
          <div className="shadowWrapper rightShadowWrapper">
            <div className="shadow rightShadow" />
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

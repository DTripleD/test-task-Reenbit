import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import { AiOutlineSearch } from "react-icons/ai";

import "./FilterForm.css";

const FilterForm = () => {
  const dispatch = useDispatch();

  const onSetFilter = (payload) => {
    dispatch(setFilter(payload));
  };

  const updateFilter = (event) => {
    onSetFilter(event.target.value);
  };

  return (
    <>
      <h1>
        <span className="logo__text">Weather</span> Forecast
      </h1>
      <form className="filter__form">
        <input
          type="text"
          placeholder="Search your trip"
          onChange={updateFilter}
          className="filter__input"
        />
        <AiOutlineSearch className="filter__icon" size="24" />
      </form>
    </>
  );
};

export default FilterForm;

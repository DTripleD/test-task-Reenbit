import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
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
    <form>
      <input
        type="text"
        placeholder="Search your trip"
        onChange={updateFilter}
      />
    </form>
  );
};

export default FilterForm;

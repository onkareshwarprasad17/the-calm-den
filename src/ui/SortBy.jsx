import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortByType = searchParams.get("sortBy") || "";

  function handleSelection(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={currentSortByType}
      type="white"
      onChange={handleSelection}
    />
  );
}

export default SortBy;

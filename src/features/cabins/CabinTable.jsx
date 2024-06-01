import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  const sortByType = searchParams.get("sortBy") || "nameAsc";

  // Filter
  let filteredValues;
  if (filterValue === "all") {
    filteredValues = cabins;
  } else if (filterValue === "no-discount") {
    filteredValues = cabins.filter((cabin) => !cabin.discount);
  } else {
    filteredValues = cabins.filter((cabin) => cabin.discount);
  }

  // Sort
  if (sortByType === "nameAsc") {
    filteredValues = filteredValues.sort((a, b) => a.name - b.name);
    console.log(filteredValues);
  }
  if (sortByType === "nameDesc")
    filteredValues = filteredValues.sort((a, b) => b.name - a.name);
  if (sortByType === "priceAsc")
    filteredValues = filteredValues.sort(
      (a, b) => a.regularPrice - b.regularPrice
    );
  if (sortByType === "priceDesc")
    filteredValues = filteredValues.sort(
      (a, b) => b.regularPrice - a.regularPrice
    );
  if (sortByType === "capacityAsc")
    filteredValues = filteredValues.sort(
      (a, b) => a.maxCapacity - b.maxCapacity
    );
  if (sortByType === "capacityDesc")
    filteredValues = filteredValues.sort(
      (a, b) => b.maxCapacity - a.maxCapacity
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>

        <Table.Body
          data={filteredValues}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

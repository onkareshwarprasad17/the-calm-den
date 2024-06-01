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
  const sortByType = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortByType.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedValues = filteredValues.sort(
    (a, b) => (a[field] - b[field]) * modifier
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
          data={sortedValues}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

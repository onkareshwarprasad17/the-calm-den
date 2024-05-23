import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <div>Filter/Sort</div>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShow(!show)}>Add Cabin</Button>
        {show && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

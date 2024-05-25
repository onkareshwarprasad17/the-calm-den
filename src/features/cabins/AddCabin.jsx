import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  /*
        Issue with previous implementation (see OldModal.jsx):-
            1. The component that needs Modal have to maintain a state to check whether the modal is open or not
            2. Due to the above fact, the component would also need to pass the state update function as well to the children or button as needed.
        
        Why this is a issue?
            As per the old implementation, it would be the responsibility of the component implementing the modal maintain the state logic of modal opening and closing.
            But in fact, THIS should be the responsibility of the MODAL to check if it is open or not, and then render the children as passed.

    */
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* Multiple Window example */}

        {/* <Modal.Open opens="table">
          <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window> */}
      </Modal>
    </>
  );
}

export default AddCabin;

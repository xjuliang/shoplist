import React from "react";

import Button from "../../../../ui/controls/Button";
import Modal, {ModalFooter} from "../../../../ui/controls/Modal";
import TextField from "../../../../ui/inputs/TextField";
import {Form} from "../MainList";

type AddFunction = (e: React.FormEvent<Form>) => void;

interface Props {
  closeAddModal: VoidFunction;
  add: AddFunction;
}

const AddModal: React.FC<Props> = ({closeAddModal, add}) => {
  return (
    <Modal onClose={closeAddModal}>
      <form onSubmit={add}>
        <h2>Add Item</h2>
        <TextField autoFocus name="text" placeholder="Name..." />
        <ModalFooter>
          <Button type="button" onClick={closeAddModal}>
            Cancel
          </Button>
          <Button colorScheme="primary" type="submit">
            Add
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddModal;

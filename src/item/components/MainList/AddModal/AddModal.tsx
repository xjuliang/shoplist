import React, {ChangeEventHandler} from "react";

import Button from "../../../../ui/controls/Button";
import Modal, {ModalFooter} from "../../../../ui/controls/Modal";
import SelectComp from "../../../../ui/inputs/Select";
import TextField from "../../../../ui/inputs/TextField";
import {Category} from "../../../types";
import {Form} from "../MainList";
import styles from "../MainList.module.scss";

type AddFunction = (e: React.FormEvent<Form>) => void;

interface AddItem {
  id: number;
  text: string;
}

interface Props {
  closeAddModal: VoidFunction;
  add: AddFunction;
  categories: Category[];
  addItem: AddItem;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const AddModal: React.FC<Props> = ({closeAddModal, add, categories, addItem, handleChange}) => {
  return (
    <Modal onClose={closeAddModal}>
      <form onSubmit={add}>
        <div className={styles.headerContainer}>
          <h2>Add Item</h2>
        </div>
        <TextField
          autoFocus
          name="text"
          placeholder="Name..."
          value={addItem.text}
          onChange={handleChange}
        />
        <SelectComp categories={categories} handleChange={handleChange} />
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

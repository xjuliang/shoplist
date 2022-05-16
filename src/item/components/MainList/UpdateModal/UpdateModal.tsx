import React, {ChangeEventHandler} from "react";

import Button from "../../../../ui/controls/Button";
import Modal, {ModalFooter} from "../../../../ui/controls/Modal";
import SelectComp from "../../../../ui/inputs/Select";
import TextField from "../../../../ui/inputs/TextField";
import {Category} from "../../../types";
import styles from "../MainList.module.scss";

interface UpdateItem {
  id: number;
  text: string;
}

type UpdateFunction = (e: React.FormEvent<HTMLFormElement>) => void;

interface Props {
  closeUpdateModal: VoidFunction;
  handleUpdate: UpdateFunction;
  updateItem: UpdateItem;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  categories: Category[];
}

const UpdateModal: React.FC<Props> = ({
  closeUpdateModal,
  updateItem,
  handleChange,
  handleUpdate,
  categories,
}) => {
  return (
    <Modal onClose={closeUpdateModal}>
      <form onSubmit={handleUpdate}>
        <div className={styles.headerContainer}>
          <h2>Update Item</h2>
        </div>
        <TextField
          autoFocus
          name="text"
          placeholder="Name..."
          value={updateItem.text}
          onChange={handleChange}
        />
        <SelectComp categories={categories} handleChange={handleChange} />
        <ModalFooter>
          <Button type="button" onClick={closeUpdateModal}>
            Cancel
          </Button>
          <Button colorScheme="primary" type="submit">
            Update
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default UpdateModal;

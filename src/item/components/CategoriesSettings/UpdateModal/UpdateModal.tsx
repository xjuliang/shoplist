import React, {ChangeEventHandler} from "react";

import Button from "../../../../ui/controls/Button";
import Modal, {ModalFooter} from "../../../../ui/controls/Modal";
import TextField from "../../../../ui/inputs/TextField";
import styles from "../CategoriesSettings.module.scss";

interface UpdateCategory {
  id: number;
  text: string;
}

type HandleChange = (e: React.FormEvent<HTMLFormElement>, id: number) => void;

interface Props {
  closeUpdateModal: VoidFunction;
  updateCategory: UpdateCategory;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleUpdate: HandleChange;
}

const UpdateModal: React.FC<Props> = ({
  closeUpdateModal,
  updateCategory,
  handleChange,
  handleUpdate,
}) => {
  return (
    <Modal onClose={closeUpdateModal}>
      <form onSubmit={(e) => handleUpdate(e, updateCategory.id)}>
        <div className={styles.headerContainer}>
          <h2>Update Category</h2>
        </div>
        <TextField
          autoFocus
          name="text"
          placeholder="Name..."
          value={updateCategory.text}
          onChange={handleChange}
        />
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

import React, {ChangeEventHandler} from "react";

import Button from "../../../../ui/controls/Button";
import Modal, {ModalFooter} from "../../../../ui/controls/Modal";
import TextField from "../../../../ui/inputs/TextField";

interface UpdateItem {
  id: number;
  text: string;
}

type HandleChange = (e: React.FormEvent<HTMLFormElement>, id: number) => void;

interface Props {
  closeUpdateModal: VoidFunction;
  updateItem: UpdateItem;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleUpdate: HandleChange;
}

const UpdateModal: React.FC<Props> = ({
  closeUpdateModal,
  updateItem,
  handleChange,
  handleUpdate,
}) => {
  return (
    <Modal onClose={closeUpdateModal}>
      <form onSubmit={(e) => handleUpdate(e, updateItem.id)}>
        <h2>Update Item</h2>
        <TextField
          autoFocus
          name="text"
          placeholder="Name..."
          value={updateItem.text}
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

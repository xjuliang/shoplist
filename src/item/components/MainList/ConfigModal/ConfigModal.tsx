import React from "react";

import Button from "../../../../ui/controls/Button";
import Modal from "../../../../ui/controls/Modal";
import closeImg from "../../../../Icons/close.png";
import styles from "../MainList.module.scss";

interface Props {
  handleSignOut: VoidFunction;
  closeConfigModal: VoidFunction;
}

const ConfigModal: React.FC<Props> = ({handleSignOut, closeConfigModal}) => {
  return (
    <Modal onClose={closeConfigModal}>
      <div className={styles.listHeader}>
        <h2>Settings</h2>
        <button className={styles.headerBtn} type="button" onClick={closeConfigModal}>
          <img alt="" src={closeImg} />
        </button>
      </div>
      <Button colorScheme="secondary">Categories Settings</Button>
      <Button colorScheme="secondary" onClick={handleSignOut}>
        Log out
      </Button>
    </Modal>
  );
};

export default ConfigModal;

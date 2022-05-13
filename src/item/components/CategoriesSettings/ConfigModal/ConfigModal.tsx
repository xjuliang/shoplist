import React from "react";

import Button from "../../../../ui/controls/Button";
import Modal from "../../../../ui/controls/Modal";
import closeImg from "../../../../Icons/close.png";
import styles from "../CategoriesSettings.module.scss";

interface Props {
  handleSignOut: VoidFunction;
  closeConfigModal: VoidFunction;
}

const ConfigModal: React.FC<Props> = ({handleSignOut, closeConfigModal}) => {
  return (
    <Modal onClose={closeConfigModal}>
      <div className={styles.headerContainer}>
        <h2>Settings</h2>
        <button className={styles.headerBtn} type="button" onClick={closeConfigModal}>
          <img alt="" src={closeImg} />
        </button>
      </div>
      <div className={styles.configContent}>
        <Button colorScheme="secondary">Categories Settings</Button>
        <Button colorScheme="primary" onClick={handleSignOut}>
          Log out
        </Button>
      </div>
    </Modal>
  );
};

export default ConfigModal;

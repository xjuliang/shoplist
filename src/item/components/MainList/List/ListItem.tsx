import React from "react";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
  onUpdate: any;
}

const ListItem: React.FC<Props> = ({children, onRemove, onUpdate}) => {
  return (
    <li className={styles.container}>
      <span>{children}</span>
      <div>
        <button className={styles.updateButton} onClick={onUpdate}>
          update
        </button>
        <button className={styles.deleteButton} onClick={onRemove}>
          delete
        </button>
      </div>
    </li>
  );
};

export default ListItem;

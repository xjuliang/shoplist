import React from "react";

import edit from "../../../../Icons/edit.png";
import trash from "../../../../Icons/trash.png";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
  onUpdate: any;
}

const ListItem: React.FC<Props> = ({children, onRemove, onUpdate}) => {
  return (
    <li className={styles.container}>
      <span>{children}</span>
      <div className={styles.buttons}>
        <button onClick={onUpdate}>
          <img alt="edit" src={edit} />
        </button>
        <button onClick={onRemove}>
          <img alt="edit" src={trash} />
        </button>
      </div>
    </li>
  );
};

export default ListItem;

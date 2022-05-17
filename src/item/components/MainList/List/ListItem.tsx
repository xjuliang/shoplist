import React from "react";

import edit from "../../../../Icons/edit.png";
import trash from "../../../../Icons/trash.png";

import styles from "./ListItem.module.scss";

type HandleMarked = (id: number, marked: boolean) => void;

interface Props {
  onRemove: VoidFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: any;
  marked: boolean;
  id: number;
  handleMarked: HandleMarked;
}

const ListItem: React.FC<Props> = ({children, onRemove, onUpdate, id, marked, handleMarked}) => {
  return (
    <li className={styles.container}>
      <span
        style={
          marked
            ? {textDecoration: "line-through", color: "grey"}
            : {color: "black", textDecoration: "none"}
        }
        onClick={() => handleMarked(id, marked)}
      >
        {children}
      </span>
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

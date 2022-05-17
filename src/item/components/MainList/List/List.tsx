/* eslint-disable react-hooks/rules-of-hooks */
import React, {useRef, MutableRefObject} from "react";

import {Category, Item} from "../../../types";

import styles from "./List.module.scss";
import ListItem from "./ListItem";

type RemoveFunction = (id: number) => void;

type ActivateUpdateModal = (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  text: string,
  category: string,
) => void;

interface Props {
  categories: Category[];
  items: Item[];
  handleRemove: RemoveFunction;
  activateUpdate: ActivateUpdateModal;
  openCategory: string;
  setOpenCategory: (value: string) => void;
}

const List: React.FC<Props> = ({
  categories,
  items,
  handleRemove,
  activateUpdate,
  openCategory,
  setOpenCategory,
}) => {
  const showCategoryItems = (category: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parentRef: MutableRefObject<any> = useRef(0);
    const categoryItems = items.filter((item) => item.category == category);

    const open = () => {
      if (openCategory !== category) setOpenCategory(category);
      else setOpenCategory("");
    };

    if (categoryItems.length) {
      const sortedItems: Item[] = categoryItems.sort((a, b) => {
        const fa = a.text.toLowerCase(),
          fb = b.text.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }

        return 0;
      });

      return (
        <>
          <h3>
            {category} - {categoryItems.length} item(s)
            <button className={styles.showBtn} onClick={open}>
              {openCategory == category ? "hide" : "show"}
            </button>
          </h3>
          <div
            ref={parentRef}
            className={styles.itemsList}
            style={
              openCategory == category
                ? {height: `${parentRef.current?.scrollHeight}px`}
                : {height: "0px"}
            }
          >
            {sortedItems.map((item) => (
              <ListItem
                key={item.id}
                onRemove={() => handleRemove(item.id)}
                onUpdate={(e: React.FormEvent<HTMLFormElement>) =>
                  activateUpdate(e, item.id, item.text, item.category)
                }
              >
                {item.text.charAt(0).toUpperCase() + item.text.slice(1)}
              </ListItem>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <ul className={styles.container}>
      {categories.map((category) => (
        <div key={category.value} className={styles.categoryContainer}>
          {showCategoryItems(category.label)}
        </div>
      ))}
    </ul>
  );
};

export default List;

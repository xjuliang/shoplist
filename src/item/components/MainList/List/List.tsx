import React from "react";

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
}

const List: React.FC<Props> = ({categories, items, handleRemove, activateUpdate}) => {
  const showCategoryItems = (category: string) => {
    const categoryItems = items.filter((item) => item.category == category);

    if (categoryItems.length) {
      return categoryItems.map((item) => (
        <ListItem
          key={item.id}
          onRemove={() => handleRemove(item.id)}
          onUpdate={(e: React.FormEvent<HTMLFormElement>) =>
            activateUpdate(e, item.id, item.text, item.category)
          }
        >
          {item.text}
        </ListItem>
      ));
    } else {
      return <p>Empty category.</p>;
    }
  };

  return (
    <ul className={styles.container}>
      {categories.map((category) => (
        <div key={category.value} className={styles.categoryContainer}>
          <h3>{category.label}</h3>
          {showCategoryItems(category.label)}
        </div>
      ))}
    </ul>
  );
};

export default List;

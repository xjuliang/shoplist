import * as React from "react";
import {Ring} from "@uiball/loaders";
import {useState, useEffect} from "react";

import Button from "../ui/controls/Button";
import {Item} from "../item/types";
import api from "../item/api";
import Modal, {ModalFooter} from "../ui/controls/Modal";
import TextField from "../ui/inputs/TextField";
import List, {ListItem} from "../item/components/List";

import styles from "./App.module.scss";

enum Status {
  Init = "init",
  Success = "success",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const remove = (id: Item["id"]) => {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  };

  const add = (e: React.FormEvent<Form>) => {
    e.preventDefault();
    const text = e.currentTarget.text.value.trim();

    if (!text) return;

    api.create(text).then((item) => {
      setItems((items) => items.concat(item));
      setModalVisible(false);
    });
  };

  useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Success);
    });
  }, []);

  if (status === Status.Init) {
    return <Ring color="#231F20" size={35} />;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
      </header>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} onRemove={() => remove(item.id)}>
            {item.text}
          </ListItem>
        ))}
      </List>
      <Button autoFocus colorScheme="primary" onClick={() => setModalVisible(true)}>
        Add item
      </Button>
      {modalVisible && (
        <Modal onClose={() => setModalVisible(false)}>
          <form onSubmit={add}>
            <h2>Add Item</h2>
            <TextField autoFocus name="text" type="text" />
            <ModalFooter>
              <Button type="button" onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button colorScheme="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;

import * as React from "react";
import {Ring} from "@uiball/loaders";
import {useState, useEffect} from "react";
import {signOut} from "firebase/auth";
import {set, ref, onValue, remove, update} from "firebase/database";
import {useNavigate} from "react-router-dom";
import {uid} from "uid";

import Button from "../../../ui/controls/Button";
import {Item} from "../../types";
import Modal, {ModalFooter} from "../../../ui/controls/Modal";
import TextField from "../../../ui/inputs/TextField";
import Nav from "../Nav";
import {auth, db} from "../../../firebase";

import List, {ListItem} from "./List";
import styles from "./MainList.module.scss";

enum Status {
  Init = "init",
  Success = "success",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const MainList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateItem, setUpdateItem] = useState<Item>({id: 0, text: ""});

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/home"))
      .catch((error) => {
        alert(error.message);
      });
  };

  //get items
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser?.uid}`), (snapshot) => {
          setItems([]);
          const data = snapshot.val();

          if (data) {
            const itemsDb: Item[] = Object.values(data);

            setItems(itemsDb);
            setStatus(Status.Success);
          }
        });
      }
    });
  }, []);

  const add = (e: React.FormEvent<Form>) => {
    e.preventDefault();
    const text = e.currentTarget.text.value.trim();

    if (!text) return;

    const itemId: string = uid();

    set(ref(db, `/${auth.currentUser?.uid}/${itemId}`), {
      text: text,
      id: itemId,
    });
    setModalVisible(false);
  };

  const handleRemove = (id: Item["id"]) => {
    remove(ref(db, `/${auth.currentUser?.uid}/${id}`));
  };

  const activateUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    id: Item["id"],
    text: Item["text"],
  ) => {
    e.preventDefault();
    setUpdateModalVisible(true);
    setUpdateItem({id: id, text: text});
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: Item["id"]) => {
    e.preventDefault();
    const text = e.currentTarget.text.value.trim();

    if (!text.length) return;
    update(ref(db, `/${auth.currentUser?.uid}/${id}`), {text: text, id: id});
    setUpdateModalVisible(false);
    setUpdateItem({id: 0, text: ""});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateItem({...updateItem, text: event.target.value});
  };

  if (status === Status.Init) {
    return <Ring color="#231F20" size={35} />;
  }

  return (
    <main className={styles.container}>
      <Nav>
        <Button colorScheme="secondary" onClick={handleSignOut}>
          Log out
        </Button>
      </Nav>
      <List>
        <h3>{items.length} item(s)</h3>
        {items.map((item) => (
          <ListItem
            key={item.id}
            onRemove={() => handleRemove(item.id)}
            onUpdate={(e: React.FormEvent<HTMLFormElement>) =>
              activateUpdate(e, item.id, item.text)
            }
          >
            {item.text}
          </ListItem>
        ))}
        {updateModalVisible && (
          <Modal onClose={() => setUpdateModalVisible(false)}>
            <form onSubmit={(e) => handleUpdate(e, updateItem.id)}>
              <h2>Update Item</h2>
              <TextField
                autoFocus
                name="text"
                type="text"
                value={updateItem.text}
                onChange={(e) => handleChange(e)}
              />
              <ModalFooter>
                <Button type="button" onClick={() => setUpdateModalVisible(false)}>
                  Cancel
                </Button>
                <Button colorScheme="primary" type="submit">
                  Update
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        )}
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

export default MainList;

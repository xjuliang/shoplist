import * as React from "react";
import {useState, useEffect} from "react";
import {signOut} from "firebase/auth";
import {set, ref, onValue, remove, update} from "firebase/database";
import {useNavigate} from "react-router-dom";
import {uid} from "uid";
import {Ring} from "@uiball/loaders";

import Modal, {ModalFooter} from "../../../ui/controls/Modal";
import {auth, db} from "../../../firebase";
import Button from "../../../ui/controls/Button";
import TextField from "../../../ui/inputs/TextField";
import Title from "../../../ui/text/title";
import {Item} from "../../types";
import configImg from "../../../Icons/config.png";

import styles from "./MainList.module.scss";
import List, {ListItem} from "./List";
import ConfigModal from "./ConfigModal";
import UpdateModal from "./UpdateModal";
import AddModal from "./AddModal";

enum Status {
  Init = "init",
  Success = "success",
}

export interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const MainList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateItem, setUpdateItem] = useState<Item>({id: 0, text: ""});
  const [configModalVisible, setConfigModalVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setItems([]);
      })
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
          const dataDb = snapshot.val();

          if (dataDb !== null) {
            const itemsDb: Item[] = Object.values(dataDb);

            setItems(itemsDb);
          }
        });
        setStatus(Status.Success);
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

  const closeAddModal = () => {
    setModalVisible(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  const closeConfigModal = () => {
    setConfigModalVisible(false);
  };

  if (status === Status.Init) {
    return <Ring color="#231F20" size={35} />;
  }

  return (
    <main className={styles.container}>
      <Title />
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <Button autoFocus colorScheme="primary" onClick={() => setModalVisible(true)}>
            Add Item
          </Button>
          <button className={styles.headerBtn} onClick={() => setConfigModalVisible(true)}>
            <img alt="" src={configImg} />
          </button>
        </div>
        <List>
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
        </List>
        <h3>{items.length} item(s)</h3>
      </div>

      {modalVisible && <AddModal add={add} closeAddModal={closeAddModal} />}

      {updateModalVisible && (
        <UpdateModal
          closeUpdateModal={closeUpdateModal}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          updateItem={updateItem}
        />
      )}
      {configModalVisible && (
        <ConfigModal closeConfigModal={closeConfigModal} handleSignOut={handleSignOut} />
      )}
    </main>
  );
};

export default MainList;

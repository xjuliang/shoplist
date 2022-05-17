import * as React from "react";
import {useState, useEffect} from "react";
import {signOut} from "firebase/auth";
import {set, ref, onValue, remove, update} from "firebase/database";
import {useNavigate} from "react-router-dom";
import {uid} from "uid";
import {Ring} from "@uiball/loaders";

import {auth, db} from "../../../firebase";
import Button from "../../../ui/controls/Button";
import Title from "../../../ui/text/title";
import {Category, Item} from "../../types";
import configImg from "../../../Icons/config.png";

import styles from "./MainList.module.scss";
import List from "./List";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [addItem, setAddItem] = useState<Item>({id: 0, text: "", category: "", marked: false});
  // eslint-disable-next-line prettier/prettier
  const [updateItem, setUpdateItem] = useState<Item>({id: 0, text: "", category: "", marked: false});
  const [configModalVisible, setConfigModalVisible] = useState<boolean>(false);

  const [openCategory, setOpenCategory] = useState<string>("");

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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser?.uid}/items`), (snapshot) => {
          setItems([]);
          const dataDb = snapshot.val();

          if (dataDb !== null) {
            const itemsDb: Item[] = Object.values(dataDb);

            setItems(itemsDb);
          }
        });

        onValue(ref(db, `/${auth.currentUser?.uid}/categories`), (snapshot) => {
          setCategories([]);
          const dataDb = snapshot.val();

          if (dataDb !== null) {
            const categoriesDb: Category[] = Object.values(dataDb);

            setCategories(categoriesDb);
          }
        });

        setStatus(Status.Success);
      }
    });
  }, []);

  const add = (e: React.FormEvent<Form>) => {
    e.preventDefault();

    if (!addItem.text || !addItem.category) return;

    const itemId: string = uid();

    set(ref(db, `/${auth.currentUser?.uid}/items/${itemId}`), {
      text: addItem.text,
      id: itemId,
      category: addItem.category,
    });
    setModalVisible(false);
    setAddItem({id: 0, text: "", category: "", marked: false});
    setOpenCategory("");
  };

  const handleRemove = (id: Item["id"]) => {
    remove(ref(db, `/${auth.currentUser?.uid}/items/${id}`));
  };

  const activateUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    id: Item["id"],
    text: Item["text"],
    category: Item["category"],
    marked: Item["marked"],
  ) => {
    e.preventDefault();
    setUpdateModalVisible(true);
    setUpdateItem({id: id, text: text, category: category, marked: marked});
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updateItem.text.length || !updateItem.category) return;
    update(ref(db, `/${auth.currentUser?.uid}/items/${updateItem.id}`), {
      text: updateItem.text,
      id: updateItem.id,
      category: updateItem.category,
    });
    setUpdateModalVisible(false);
    setUpdateItem({id: 0, text: "", category: "", marked: false});
  };

  interface HandleChange extends React.ChangeEvent<HTMLInputElement> {
    label: string;
  }

  const handleChangeUpdate = (event: HandleChange) => {
    if (!event) {
      setUpdateItem({...updateItem, category: ""});

      return;
    }
    if (event.label) setUpdateItem({...updateItem, category: event.label});
    else {
      event.preventDefault();
      setUpdateItem({...updateItem, text: event.target.value});
    }
  };

  const handleChangeAdd = (event: HandleChange) => {
    if (!event) {
      setAddItem({...addItem, category: ""});

      return;
    }
    if (event.label) setAddItem({...addItem, category: event.label});
    else {
      event.preventDefault();
      setAddItem({...addItem, text: event.target.value});
    }
  };

  const handleMarked = (id: Item["id"], marked: Item["marked"]) => {
    update(ref(db, `/${auth.currentUser?.uid}/items/${id}`), {
      marked: !marked,
    });
  };

  const closeAddModal = () => setModalVisible(false);

  const closeUpdateModal = () => setUpdateModalVisible(false);

  const closeConfigModal = () => setConfigModalVisible(false);

  if (status === Status.Init) {
    return <Ring color="#231F20" size={35} />;
  }

  return (
    <main className={styles.container}>
      <Title />
      <div className={styles.listContainer}>
        <div className={styles.headerContainer}>
          <Button autoFocus colorScheme="primary" onClick={() => setModalVisible(true)}>
            Add Item
          </Button>
          <button className={styles.headerBtn} onClick={() => setConfigModalVisible(true)}>
            <img alt="" src={configImg} />
          </button>
        </div>
        {items.length ? (
          <List
            activateUpdate={activateUpdate}
            categories={categories}
            handleMarked={handleMarked}
            handleRemove={handleRemove}
            items={items}
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
          />
        ) : (
          <h3>Empty list.</h3>
        )}
      </div>
      {modalVisible && (
        <AddModal
          add={add}
          addItem={addItem}
          categories={categories}
          closeAddModal={closeAddModal}
          handleChange={handleChangeAdd}
        />
      )}
      {updateModalVisible && (
        <UpdateModal
          categories={categories}
          closeUpdateModal={closeUpdateModal}
          handleChange={handleChangeUpdate}
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

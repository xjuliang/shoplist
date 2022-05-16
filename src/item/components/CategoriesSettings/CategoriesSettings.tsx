import * as React from "react";
import {useState, useEffect} from "react";
import {signOut} from "firebase/auth";
import {set, ref, onValue, remove, update} from "firebase/database";
import {Link, useNavigate} from "react-router-dom";
import {uid} from "uid";
import {Ring} from "@uiball/loaders";

import {auth, db} from "../../../firebase";
import Button from "../../../ui/controls/Button";
import Title from "../../../ui/text/title";
import {Category} from "../../types";
import arrowImg from "../../../Icons/arrow-back.png";

import styles from "./CategoriesSettings.module.scss";
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

const CategoriesSettings: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateCategory, setUpdateCategory] = useState<Category>({value: 0, label: ""});
  const [configModalVisible, setConfigModalVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setCategories([]);
      })
      .then(() => navigate("/home"))
      .catch((error) => {
        alert(error.message);
      });
  };

  //get categories
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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
    const text = e.currentTarget.text.value.trim();

    if (!text) return;

    const CategoryId: string = uid();

    set(ref(db, `/${auth.currentUser?.uid}/categories/${CategoryId}`), {
      label: text,
      value: CategoryId,
    });
    setModalVisible(false);
  };

  const handleRemove = (CategoryId: Category["value"]) => {
    remove(ref(db, `/${auth.currentUser?.uid}/categories/${CategoryId}`));
  };

  const activateUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    id: Category["value"],
    text: Category["label"],
  ) => {
    e.preventDefault();
    setUpdateModalVisible(true);
    setUpdateCategory({value: id, label: text});
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: Category["value"]) => {
    e.preventDefault();
    const text = e.currentTarget.text.value.trim();

    if (!text.length) return;
    update(ref(db, `/${auth.currentUser?.uid}/categories/${id}`), {label: text, value: id});
    setUpdateModalVisible(false);
    setUpdateCategory({value: 0, label: ""});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCategory({...updateCategory, label: event.target.value});
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
        <div className={styles.headerContainer}>
          <h2>Categories Settings</h2>

          <Link to="/list">
            <button className={styles.headerBtn}>
              <img alt="" src={arrowImg} />
            </button>
          </Link>
        </div>
        <Button autoFocus colorScheme="primary" onClick={() => setModalVisible(true)}>
          Add Category
        </Button>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.value}
              onRemove={() => handleRemove(category.value)}
              onUpdate={(e: React.FormEvent<HTMLFormElement>) =>
                activateUpdate(e, category.value, category.label)
              }
            >
              {category.label}
            </ListItem>
          ))}
        </List>
      </div>

      {modalVisible && <AddModal add={add} closeAddModal={closeAddModal} />}

      {updateModalVisible && (
        <UpdateModal
          closeUpdateModal={closeUpdateModal}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          updateCategory={updateCategory}
        />
      )}
      {configModalVisible && (
        <ConfigModal closeConfigModal={closeConfigModal} handleSignOut={handleSignOut} />
      )}
    </main>
  );
};

export default CategoriesSettings;

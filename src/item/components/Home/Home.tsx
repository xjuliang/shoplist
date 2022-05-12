import * as React from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";

import {app, auth, provider} from "../../../firebase";
import Button from "../../../ui/controls/Button";
import Nav from "../Nav";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/list");
      }
    });
  });

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className={styles.container}>
      <Nav>
        <p>nav</p>
      </Nav>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
      </header>
      <Button autoFocus colorScheme="primary" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </main>
  );
};

export default Home;

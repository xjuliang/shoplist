import * as React from "react";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";

import {auth, provider} from "../../../firebase";
import Button from "../../../ui/controls/Button";
import Title from "../../../ui/text/title";

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
      // eslint-disable-next-line no-console
      .catch(() => alert("Please, login to use the shoplist."));
  };

  return (
    <main className={styles.container}>
      <Title />
      <Button autoFocus colorScheme="primary" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </main>
  );
};

export default Home;

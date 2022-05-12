import * as React from "react";
import {Link} from "react-router-dom";

import Nav from "../Nav";

import styles from "./SignIn.module.scss";

const SignIn: React.FC = () => {
  return (
    <main className={styles.container}>
      <Nav>
        <Link to="/signUp">
          <p>SignUp</p>
        </Link>
      </Nav>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>Sign In</h3>
      </header>
    </main>
  );
};

export default SignIn;

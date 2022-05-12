import * as React from "react";

import styles from "./Nav.module.scss";

const Home: React.FC = ({children}) => {
  return <nav className={styles.container}>{children}</nav>;
};

export default Home;

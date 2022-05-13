import * as React from "react";

import styles from "./Title.module.scss";

const Title: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>ShopList</h1>
    </div>
  );
};

export default Title;

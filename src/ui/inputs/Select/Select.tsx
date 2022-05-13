import React from "react";

import styles from "./Select.module.scss";

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
  return (
    <select className={styles.container} {...props}>
      <option value="greengrocery">Greengrocery</option>
      <option value="bakery">Bakery</option>
    </select>
  );
};

export default Select;

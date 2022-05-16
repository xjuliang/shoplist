import React, {ChangeEventHandler, useState} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import {Category} from "../../../item/types";

import styles from "./Select.module.scss";

interface Props {
  categories: Category[];
  handleChange: any;
}

const SelectComp: React.FC<Props> = ({categories, handleChange}) => {
  return (
    <Select
      isClearable
      isSearchable
      className={styles.container}
      options={categories}
      placeholder="Category..."
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "dodgerblue",
          primary: "dodgerblue",
        },
      })}
      onChange={handleChange}
    />
  );
};

export default SelectComp;

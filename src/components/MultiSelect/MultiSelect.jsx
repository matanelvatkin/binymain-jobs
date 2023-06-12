import React, { useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import RoundButton from "../RoundButton";
import { hebTranslation } from "../SelectIcon/translition";
import { settingsContext } from "../../layout/Layout";

const MultiSelect = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div className={styles.multiselect}>
      {options.map((option) => (
        <RoundButton
          //   text={hebTranslation[category.name]}
          icon={"category.icon"}
          key={option.value}
          className={selectedOptions.includes(option.value) ? "selected" : ""}
          onClick={() => handleOptionClick(option.value)}
          // >
          //   {option.label}
        />
      ))}
    </div>
  );
};

export default MultiSelect;

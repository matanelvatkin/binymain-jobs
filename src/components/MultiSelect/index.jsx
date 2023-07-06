import React, { useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { useEffect } from "react";

const MultiSelect = ({
  options,
  placeholder,
  values,
  setValues,
  name,
  errorMessage,
  isValid,
  selectRequired,
  setSelectRequired,
}) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [validationMessage, setValidationMessage] = useState(!isValid);

  useEffect(() => {
    if (selectedOption && selectedOption.value) {
      setValues({ ...values, [name]: selectedOption.value });
      name&&sessionStorage.setItem("place", selectedOption.value);
      setSelectRequired(false);
    }
    console.log("name : ",name);
    console.log(isValid);
  }, [selectedOption]);
  return (
    <>
      <Select
      style={{width:'100%'}}
        options={options}
        blurInputOnSelect={true}
        isRtl={true}
        placeholder={placeholder}
        defaultValue={name&&
          sessionStorage.getItem("place") != null
            ? {
                label: sessionStorage.getItem("place"),
                value: sessionStorage.getItem("place"),
              }
            : { label: placeholder, value: `${placeholder}` }
        }
        isSearchable={true}
        isClearable={true}
        required={true}
        className={styles.submitted}
        onChange={setSelectedOption}
        onBlur={() => {
          setSelectRequired(true);
        }}
      />
      {!validationMessage && selectRequired && (
        <span className={styles.errorMessage || validationMessage}>
          {errorMessage}
        </span>
      )}
    </>
  );
};

export default MultiSelect;

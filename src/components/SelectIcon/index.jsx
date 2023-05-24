import React, { useState, useEffect } from "react";
import RoundButton from "../RoundButton";
import styles from "./style.module.css";
import { hebTranslation } from "./translition";

// creator: Yisrael Olonoff
// this function takes an array of objects containing icon and name keys,
// and returns RoundButtons for each object with the name and icon of the object.
// it takes a header as a props.
// it alows you to choose multiple choices and save them in activeArray state.
// example: <SelectIcon array={array} header={'My header'} />

const SelectIcon = ({
  array = [],
  setArray,
  setValues = () => {},
  values,
  name,
  header,
  text,
  icon,
  errorMessage,
  inText,
  ...props
}) => {
  const [isChosen, setIsChosen] = useState(true);
  const handleCategoryClick = (e) => {
    if (typeof setArray === "function") {
      setArray((prev) =>
        prev.map((v, i) =>
          i == e.target.getAttribute("data-index")
            ? { ...v, isActive: !v.isActive }
            : v
        )
      );
    }
  };

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      [name]: array.filter((obj) => obj.isActive),
    }));
  }, [array]);

  useEffect(() => {
    if (!values[name][0]) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  });

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.header}>{header}</p>
        <div className={styles.icons}>
          {array.map((category, index) => (
            <RoundButton
              inText={inText}
              data-index={index}
              key={index}
              text={hebTranslation[category.name]}
              icon={category.icon}
              isActive={category.isActive}
              func={handleCategoryClick}
              {...props}
            />
          ))}
        </div>
      </div>
      <div>
        {isChosen ? (
          <span className={styles.errorMessage}> {errorMessage}</span>
        ) : (
          <span className={styles.isChosen}> {errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default SelectIcon;

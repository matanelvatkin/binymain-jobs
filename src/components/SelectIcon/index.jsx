import React, { useState, useEffect } from "react";
import RoundButton from "../RoundButton";
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// this function takes an array of objects containing icon and name keys,
// and returns RoundButtons for each object with the name and icon of the object.
// it takes a header as a props.
// it alows you to choose multiple choices and save them in activeArray state.
// example: <SelectIcon array={array} header={'My header'} />

const SelectIcon = ({
  array = [],
  setValues = () => {},
  values,
  name,
  header,
  text,
  icon,
  inText,
  Days,
  ...props
}) => {
  const [activeArray, setActiveArray] = useState([...array]);
  console.log(activeArray);
  const handleCategoryClick = (category) => {
    if (activeArray.includes(category)) {
      setActiveArray([
        ...activeArray,
        (activeArray.indexOf(category).isActive = false),
      ]);
    } else {
      console.log(category);
      setActiveArray([
        ...activeArray,
        (activeArray.indexOf(category).isActive = true),
      ]);
    }
  };
  useEffect(() => {
    setValues({ ...values, [name]: activeArray });
  }, [activeArray]);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.header}>{header}</p>
        <div className={Days ? styles.icons + " " + styles.days : styles.icons}>
          {array.map((category, index) => (
            <RoundButton
              inText={inText}
              key={index}
              text={category.name}
              icon={category.icon}
              isActive={activeArray.includes(category)}
              activeArray={activeArray}
              setActiveArray={setActiveArray}
              func={() => handleCategoryClick(category.name)}
              Days
              {...props}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectIcon;

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
  ...props
}) => {
  const [activeArray, setActiveArray] = useState([]);
  const handleCategoryClick = (category) => {
    if (activeArray.includes(category)) {
      setActiveArray(activeArray.filter((item) => item !== category));
      setActiveArray(activeArray.filter((item) => item !== category));
    } else {
      setActiveArray([...activeArray, category]);
    }
  };
  useEffect(() => {
    setValues({
      ...values,
      [name]: activeArray.map((obj) => {
        console.log(obj);
        return obj;
      }),
    });
  }, [activeArray]);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.header}>{header}</p>
        <div className={styles.icons}>
          {array.map((category, index) => (
            <RoundButton
              inText={inText}
              key={index}
              text={category.name}
              icon={category.icon}
              isActive={activeArray.includes(category.name)}
              activeArray={activeArray.name}
              setActiveArray={setActiveArray}
              func={() => handleCategoryClick(category.name)}
              {...props}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectIcon;

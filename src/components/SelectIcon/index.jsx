import React, { useState, useEffect } from 'react'
import RoundButton from '../RoundButton';
import styles from './style.module.css'

// creator: Yisrael Olonoff
// this function takes an array of strings and returns RoundButtons
// for each string with the name of that string.
// also it alows you to choose multiple choices. 

const SelectIcon = ({array=[] , text, icon, ...props}) => {
  const [activeArray, setActiveArray] = useState([]);

  const handleCategoryClick = (category) => {
    if (activeArray.includes(category)) {
      setActiveArray(activeArray.filter((item) => item !== category));
      console.log(activeArray);
    } else {
      setActiveArray([...activeArray, category]);
      console.log(activeArray);
    }
  };

  return (
    <div className={styles.main}>
        
      {array.map((category, index) => (
        <RoundButton
          key={index}
          text={category}
          icon={icon}
          isActive={activeArray.includes(category)}
          activeArray={activeArray}
          setActiveArray={setActiveArray}
          func={() => handleCategoryClick(category)}
          {...props}
        />
      ))}
    </div>
  );
}

export default SelectIcon;
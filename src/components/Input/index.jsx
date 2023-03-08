import styles from "./style.module.css";
import { useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const { label, style = {}, className = "", onChange, ...inputProps } = props;
  return (
    <div className={`${styles.Name} ${className}`} style={style} {...props}>
      <label>
        <div>{label} </div>
        <input {...inputProps} onChange={onChange} />
      </label>
    </div>
  );
};

export default Input;

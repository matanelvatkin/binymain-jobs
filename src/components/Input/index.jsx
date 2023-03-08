import styles from "./style.module.css";
import { useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const { label, className = "", onChange, ...inputProps } = props;
  return (
    <div className={`${styles.Name} ${className}`} {...props}>
      <label className={styles.label}>
        <div>{label} </div>
      </label>
      <input className={styles.input} {...inputProps} onChange={onChange} />
    </div>
  );
};

export default Input;

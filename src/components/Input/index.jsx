import styles from "./style.module.css";
import { useRef, useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const {
    label,
    errorMessage,
    className = "",
    type,
    onChange,
    width,
    refInput,
    ...inputProps
  } = props;
  // const onChange = (e) => {
  //   if (e.target.type === "file") {
  //     console.log("file", e.target.files);
  //   }
  // };
  const tempRef = useRef()
  return (
    <>
      {type != "radio" ? (
        <div className={styles.container}>
          <label className={styles.label}>
            <div>{label} </div>
          </label>
          <input
            className={`${styles.input} ${className}`}
            {...inputProps}
            // style={{ width: width }}
            onChange={onChange}
            type={type}
            ref={refInput?refInput:tempRef}
          />
          <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
      ) : (
        <div className={styles.radio}>
          <input
            className={`${styles.input} ${className}`}
            {...inputProps}
            style={{ width: width }}
            onChange={onChange}
            type={type}
            ref={refInput?refInput:tempRef}
          />
          <label className={styles.labelRadio}>
            <div>{label} </div>
          </label>
          <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
      )}
    </>
  );
};

export default Input;

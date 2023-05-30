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
    inputRef,
    isTheSubmitButtonPush,
    ...inputProps
  } = props;
  const [validationMessage, setValidationMessage] = useState("");
  const onInvalid = (e) => {
    const target = e.target;
    setValidationMessage(target.errorMessage);
  };
  const onBlur = (e) => {
    const target = e.target;

    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };
  // const onChange = (e) => {
  //   if (e.target.type === "file") {
  //     console.log("file", e.target.files);
  //   }
  // };
  const tempRef = useRef();
  return (
    <>
      {type != "radio" ? (
        <div>
          <label className={styles.label}>
            <div>{label} </div>
          </label>
          <input
            className={`${styles.input} ${className}`}
            {...inputProps}
            // style={{ width: width }}
            onChange={onChange}
            type={type}
            ref={inputRef ? inputRef : tempRef}
          />
          {isTheSubmitButtonPush ? (
            <span className={styles.errorMessage}>{errorMessage}</span>
          ) : null}
        </div>
      ) : (
        <div className={styles.radio}>
          <input
            className={`${styles.input} ${className}`}
            {...inputProps}
            style={{ width: width }}
            onChange={onChange}
            type={type}
            onBlur={onBlur}
            onInvalid={onInvalid}
            // ref={inputRef ? inputRef : tempRef}
          />
          <label className={styles.labelRadio}>
            <div>{label} </div>
          </label>
          {isTheSubmitButtonPush ? (
            <span className={styles.errorMessage}>{errorMessage}</span>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Input;

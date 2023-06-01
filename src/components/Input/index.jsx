import styles from "./style.module.css";
import { useRef, useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const {
    label,
    errorMessage,
    instructions,
    className = "",
    type,
    onChange,
    width,
    refInput,
    isTheSubmitButtonPush,
    ...inputProps
  } = props;
  const [validationMessage, setValidationMessage] = useState("");
  const tempRef = useRef();
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
            ref={refInput ? refInput : tempRef}
          />
          <p className={styles.uploadInstructions}>{instructions}</p>
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

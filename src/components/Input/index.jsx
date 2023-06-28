import styles from "./style.module.css";
import { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
    isValid,
    isTheSubmitButtonPush,
    onblur = () => {},
    ...inputProps
  } = props;
  const [validationMessage, setValidationMessage] = useState(!isValid);

  const onInvalid = (e) => {
    setValidationMessage(true);
  };

  const onBlur = (e) => {
    onblur();
    const target = e.target;
    if (!!validationMessage) {
      setValidationMessage(false);
    }
  };

  const tempRef = useRef();
  return (
    <>
      {type != "radio" ? (
        <div>
          <label className={styles.label}>
            <div>{label} </div>
          </label>
          <input
            // className={`${styles.input} ${className}`}
            className="form-control"
            {...inputProps}
            onInvalid={onInvalid}
            onBlur={onBlur}
            onChange={onChange}
            type={type}
            ref={refInput ? refInput : tempRef}
          />
          <p className={styles.uploadInstructions}>{instructions}</p>
          {!!validationMessage && (
            <span className={styles.errorMessage || validationMessage}>
              {errorMessage}
            </span>
          )}
        </div>
      ) : (
        <div className={styles.radio}>
          <input
            className={`${styles.input} ${className}`}
            style={{ width: width }}
            onChange={onChange}
            type={type}
            onBlur={onBlur}
            onInvalid={onInvalid}
            {...inputProps}
            // ref={inputRef ? inputRef : tempRef}
          />
          <label className={styles.labelRadio}>
            <div>{label} </div>
          </label>
          {!!validationMessage && (
            <span className={styles.errorMessage || validationMessage}>
              {errorMessage}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Input;

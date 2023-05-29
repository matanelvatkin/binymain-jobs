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
  const [validationMessage, setValidationMessage] = useState("");

  const onInvalid = (e) => {
    const target = e.target;
    setValidationMessage(target.validationMessage);
  };

  const onBlur = (e) => {
    const target = e.target;

    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };
  const tempRef = useRef();
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
            onBlur={onBlur}
            onInvalid={onInvalid}
            // style={{ width: width }}
            onChange={onChange}
            type={type}
            ref={refInput ? refInput : tempRef}
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
            ref={refInput ? refInput : tempRef}
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

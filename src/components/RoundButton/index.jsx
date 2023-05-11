import React from "react";
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: icon, func, text, ...props.
// to add text in your button use the text prop, example:
// <RoundButton icon={<Icon/>} func={func} text={'text'} ></RoundButton>
// to get nice results use fill icons, png type.

function RoundButton({ icon, func, text, inText, ...props }) {
  return !inText ? (
    <div className={styles.main}>
      <button
        className={
          props.isActive ? styles.button + " " + styles.active : styles.button
        }
        onClick={func}
        {...props}
        type="button"
      >
        <img className={styles.icon} src={icon} id={props.id} />
      </button>
      <span className={styles.inText}>{text}</span>
    </div>
  ) : (
    <div className={styles.main}>
      <button
        className={
          props.isActive ? styles.button + " " + styles.active : styles.button
        }
        type="button"
        onClick={func}
        {...props}
      >
      </button>
      <span className={styles.inText}>{text}</span>

    </div>
  );
}

export default RoundButton;

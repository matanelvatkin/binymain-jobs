import React from "react";
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: icon, func, text, ...props.
// to add text in your button use the text prop, example:
// <RoundButton icon={<Icon/>} func={func} text={'text'} ></RoundButton>
// to get nice results use fill icons, png type.

function RoundButton({ icon, func, text, inText, Days, ...props }) {
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
        <img
          className={styles.icon}
          src={icon}
          id={props.id}
          data-index={props["data-index"]}
        />
      </button>
      <span>{text}</span>
    </div>
  ) : (
    <div className={styles.main}>
      <button
        className={
          props.isActive
            ? styles.button + " " + styles.active + " " + styles.day
            : styles.button + " " + styles.day
        }
        type="button"
        onClick={func}
      >
        <span className={styles.inText}>{text}</span>
      </button>
    </div>
  );
}

export default RoundButton;

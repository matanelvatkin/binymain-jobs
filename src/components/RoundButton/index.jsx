import React from "react";
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: icon, func, text, ...props.
// to add text in your button use the text prop, example:
// <RoundButton icon={<Icon/>} func={func} text={'text'} ></RoundButton>

function RoundButton({ icon, func, text, inText, ...props }) {
  return !inText ? (
    <div className={styles.main}>
      {console.log(inText)}
      <button
        className={
          props.isActive ? styles.button + " " + styles.active : styles.button
        }
        onClick={func}
        {...props}
      >
        <img className={styles.icon} src={icon} id={props.id} />
      </button>
      <span>{text}</span>
    </div>
  ) : (
    <div className={styles.main}>
      <button
        className={
          props.isActive ? styles.button + " " + styles.active : styles.button
        }
        onClick={func}
        {...props}
      >
        <span className={styles.inText}>{text}</span>
      </button>
    </div>
  );
}

export default RoundButton;

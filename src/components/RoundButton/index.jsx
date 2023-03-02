import React from 'react'
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: icon, func, text, ...props.
// to add text in your button use the text prop, example: 
// <RoundButton icon={<Icon/>} func={func} text={'text'} ></RoundButton>


function RoundButton({ icon, func, text, ...props }) {
  return (
    <div className={styles.main}>
      <button
        className={styles.button}
        func={func}
        {...props}
      >
        {icon}
      </button>
      <span>
        {text}
      </span>
    </div>
  )
}

export default RoundButton
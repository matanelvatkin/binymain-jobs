import React from "react";
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: type={}, width={}, func={}, {props}.
// to add text in your button use the text prop, example:
// <Button type={'submit'} width={'200px'} text={'Click'}></Button>

function ClassicButton({
  text,
  children,
  type,
  width,
  height,
  backgroundColor,
  color,
  border,
  func,
  disabled,
  ...props
}) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        style={{ width: width, height: height, backgroundColor:backgroundColor,color:color, border:border}}
        onClick={func}
        className={
          props.oppositeColor
            ? props.isActive
              ? styles.button
              : styles.oppositeColorBtn
            : styles.button
        }
        {...props}
      >
        {text}
        {children}
      </button>
    </>
  );
}

export default ClassicButton;

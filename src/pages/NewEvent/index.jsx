import ClassicButton from "../../components/ClassicButton copy";
import Input from "../../components/Input";
import styles from "./style.module.css";

export default function NewEvent({ style = {}, className = "", ...props }) {
  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      <div>header</div>
      <Input text="שם האירוע" />
      <Input text="תקציר"></Input>
      <Input text="שם המפרסם"></Input>
      <Input text="טלפון"></Input>
      <Input text="מייל"></Input>
      <div>תאריך</div>
      <Input />

      <div>מיקום</div>

      <div>קטגוריה</div>

      <div>קהל יעד</div>

      <Input text="מיקום מדויק"></Input>
      <Input text="דף הרשמה לאירוע"></Input>
      <div>image upload</div>

      <div className={styles.button}>
        <ClassicButton
          width={"200px"}
          text={"Save"}
          // onClick={}
        />
      </div>
    </div>
  );
}

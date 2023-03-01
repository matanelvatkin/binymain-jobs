import Input from "../../components/Input";
import styles from "./style.module.css";

export default function NewEvent({ style = {}, className = "", ...props }) {
  return (
    <div
      dir="RTL"
      className={`${styles.Name} ${className}`}
      style={style}
      {...props}
    >
      <div>header</div>
      <Input text="שם האירוע"></Input>
      <Input text="תקציר"></Input>
      <Input text="שם המפרסם"></Input>
      <Input text="טלפון"></Input>
      <Input text="מייל"></Input>
      <div>תאריך</div>

      <div>מיקום</div>

      <div>קטגוריה</div>

      <div>קהל יעד</div>

      <Input text="מיקום מדויק"></Input>
      <Input text="דף הרשמה לאירוע"></Input>
      <div>image upload</div>

      <div>שמירה</div>
    </div>
  );
}

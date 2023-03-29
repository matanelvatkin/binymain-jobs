import React from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import styles from "./style.module.css";

export default function NoRepeatEvent() {
  const [chooseRadio, setChooseRadio] = useState("");
  const chooseRadioClick = (e) => {
    setChooseRadio(e.target.value);
  };
  return (
    <>
      החל מתאריך:
      <DateInput />
      <Input
        onChange={chooseRadioClick}
        label="בתאריך"
        type="radio"
        name="repeatEnd"
        value="endDate"
      />
      <Input
        onChange={chooseRadioClick}
        label="בעוד מספר פעמים"
        type="radio"
        name="repeatEnd"
        value="endNumber"
      />
      {chooseRadio === "endDate" ? (
        <DateInput />
      ) : (
        <Input placeholder="בעוד מספר פעמים" type="text" name="repeatNumber" />
      )}
    </>
  );
}

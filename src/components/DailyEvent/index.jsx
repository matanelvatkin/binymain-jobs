import React, { useEffect, useState } from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import styles from "./style.module.css";

export default function DailyEvent({ values, setValues = () => {}, ...props }) {
  const [chooseRadio, setChooseRadio] = useState("");
  const [endRepeat, setEndRepeat] = useState({});
  const chooseRadioClick = (e) => {
    setChooseRadio(e.target.value);
  };
  const onChange=(e)=>{
    setValues({ ...values, repeatSettingsRepeatEnd: e.target.value });
  }
  useEffect(() => {
    if(endRepeat) setValues({ ...values, repeatSettingsRepeatEnd: endRepeat.date});
  },[endRepeat])
  useEffect(() => {
    setEndRepeat()
    setValues({ ...values, repeatSettingsType: chooseRadio });
  }, [chooseRadio]);
  return (
    <>
      החל מתאריך:
      <DateInput values={values} setValues={setValues} />
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
        <DateInput values={endRepeat} setValues={setEndRepeat} />
      ) : (
        <Input onChange={onChange} placeholder="בעוד מספר פעמים" type="number" name="repeatNumber" />
      )}
    </>
  );
}

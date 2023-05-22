import React, { useEffect, useState } from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import styles from "./style.module.css";

export default function DailyEvent({ values, setValues = () => { }, ...props }) {
  const [chooseRadio, setChooseRadio] = useState("");
  const [endRepeat, setEndRepeat] = useState({});
  const chooseRadioClick = (e) => {
    setChooseRadio(e.target.value);
  };
  const onChange = (e) => {
    setValues({ ...values, repeatSettingsRepeatEnd: e.target.value });
  }
  useEffect(() => {
    if (endRepeat) setValues({ ...values, repeatSettingsRepeatEnd: endRepeat.date });
  }, [endRepeat])
  useEffect(() => {
    setEndRepeat()
    setValues({ ...values, repeatSettingsType: chooseRadio });
  }, [chooseRadio]);
  return (
    <>
      <label className={styles.titles}>החל מתאריך</label>
      <div className={styles.startDate}>
        <DateInput values={values} setValues={setValues} />
      </div>
    
  
      <label className={styles.titles}>סיום</label>
      <div className={styles.endDate}>
        <div className={styles.endDateInputs}>
          <Input
            onChange={chooseRadioClick}
            label="בתאריך"
            type="radio"
            name="repeatEnd"
            value="endDate"
            // checked
          />
          <Input
            onChange={chooseRadioClick}
            label="בעוד מספר פעמים"
            type="radio"
            name="repeatEnd"
            value="endNumber"
          />
        </div>
        {chooseRadio === "endDate" ? (
          <div className={styles.date}>

            <DateInput values={endRepeat} setValues={setEndRepeat} />
          </div>
        ) : (
          <div className={styles.numberOfDays}>
            <Input onChange={onChange} placeholder=" מספר הפעמים" type="number" min="1" name="repeatNumber" />
          </div>
        )}
      </div>
     
    </>

  );
};

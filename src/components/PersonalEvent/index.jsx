import { useEffect, useState } from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import Select from "../Select";
import SelectIcon from "../SelectIcon";
import styles from "./style.module.css";

// creator: matanel vatkin
// color: _______________
// icon: ________________

const PersonalEvent = ({
  values,
  setValues = () => { },
  ...props
}) => {
  const days = [
    { name: "א" },
    { name: "ב" },
    { name: "ג" },
    { name: "ד" },
    { name: "ה" },
    { name: "ו" },
    { name: "ש" },
  ];
  const repeat = ["דו חודשי", "שבועי", "ללא חזרה"];
  const [endRepeat, setEndRepeat] = useState({});
  const [chooseRadio, setChooseRadio] = useState("");
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
  const chooseRadioClick = (e) => {
    setChooseRadio(e.target.value);
  };
  return (
    <>
      <div className={styles.numberOfDays}>
        <Select
          choossArray={repeat}
          placeholder="ללא חזרה"
          icon=""
          name="personalRepeatType"
          values={values}
          setValues={setValues}
        />
      </div>
        <label className={styles.titles}>החל מתאריך</label>

      <div className={styles.startDate}>
        <DateInput values={values} setValues={setValues} />
      </div>
      <div className={styles.days_div}>
        <SelectIcon
          array={days}
          text={days}
          inText={true}
          header={"חזרה בימים:"}
          name="days"
          values={values}
          setValues={setValues}
          Days={true}
        />
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
            <Input onChange={onChange} placeholder="בעוד מספר פעמים" type="text" name="repeatNumber" />
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalEvent;

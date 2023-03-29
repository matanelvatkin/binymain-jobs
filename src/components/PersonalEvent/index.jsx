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
  setValues = () => {},
  onChange,
  choossArray,
  // chooseRadio,
  // setChooseRadio,
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
  const [repeatDay, setRepeatDay] = useState("");
  const [chooseDay, setChooseDay] = useState([]);
  const [chooseRadio, setChooseRadio] = useState("");
  const onClickDay = (e) => {
    if (chooseDay.includes(e.target.value))
      setChooseDay(chooseDay.filter((day) => day !== e.target.value));
    else setChooseDay([...chooseDay, e.target.value]);
  };
  useEffect(() => {
    setValues({ ...values, days: chooseDay });
  }, [chooseDay]);
  useEffect(() => {
    setValues({ ...values, repeat: repeatDay.repeat });
    console.log(repeatDay);
  }, [repeatDay]);
  const chooseRadioClick = (e) => {
    setChooseRadio(e.target.value);
  };
  return (
    <>
      <label>
        החל מתאריך:
        <DateInput />
      </label>
      <div className={styles.days_div}>
        <SelectIcon array={days} text={days} inText={true} header={"ימים"} />
      </div>
      <Select choossArray={repeat} placeholder="ללא חזרה" icon="" />
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
};

export default PersonalEvent;

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
  const chooseRadioClick = (e) => {
    setChooseRadio(e.target.value);
  };
  return (
    <>
      <label>
        החל מתאריך:
        <DateInput values={values} setValues={setValues} />
      </label>
      <div className={styles.days_div}>
        <SelectIcon
          array={days}
          text={days}
          inText={true}
          header={"ימים"}
          name="days"
          values={values}
          setValues={setValues}
        />
      </div>
      <Select
        choossArray={repeat}
        placeholder="ללא חזרה"
        icon=""
        name="personalRepeatType"
        values={values}
        setValues={setValues}
      />
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
        <Input onChange={onChange} placeholder="בעוד מספר פעמים" type="text" name="repeatNumber" />
      )}
    </>
  );
};

export default PersonalEvent;

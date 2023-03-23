import { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import styles from "./style.module.css";

// creator: matanel vatkin
// color: _______________
// icon: ________________

const PersonalEvent = ({
  values,
  setValues,
  onChange,
  choossArray,
  ...props
}) => {
  const days = [, "א", "ב", "ג", "ד", "ה", "ו", "ש"];
  const repeat = ['ללא', 'שבועי', 'דו חודשי', 'חודשי'];
  const [repeatDay, setRepeatDay] = useState("");
  const [choossDay, setChoossDay] = useState([]);
  const onClickDay = (e) => {
    if (choossDay.includes(e.target.value))
      setChoossDay(choossDay.filter((day) => day !== e.target.value));
    else setChoossDay([...choossDay, e.target.value]);
  };
  useEffect(() => {
    setValues({ ...values, days: choossDay });
  }, [choossDay]);
  useEffect(() => {
    setValues({ ...values, repeat: repeatDay.repeat });
    console.log(repeatDay);
  }, [repeatDay]);
  const event = [
    {
      id: 6,
      name: "date",
      type: "date",
      label: "החל מתאריך",
      placeholder: "בחר תאריך ביומן",
      required: true,
    },
    {
      id: 7,
      name: "beginningTime",
      type: "time",
      label: "זמן התחלה",
      placeholder: "זמן התחלה",
    },
    {
      id: 8,
      name: "finishTime",
      type: "time",
      label: "זמן סיום",
      placeholder: "זמן סיום",
    },
    {
      id: 9,
      name: "place",
      type: "select",
      label: "מקום",
      placeholder: "בחר מיקום",
      required: true,
    },
    {
      id: 10,
      name: "category",
      type: "select",
      label: "קטגוריה",
      placeholder: "קטגוריה",
    },
    {
      id: 11,
      name: "targetAudience",
      type: "select",
      label: "קהל יעד",
      placeholder: "קהל יעד",
    },
    {
      id: 12,
      name: "registrationPageURL",
      type: "text",
      label: "דף הרשמה לאירוע",
      placeholder: "דף הרשמה לאירוע",
    },
    {
      id: 13,
      name: "cardImageURL",
      type: "file",
      label: "תמונת אירוע",
      // required: true,
    },
    {
      id: 14,
      name: "coverImageURL",
      type: "file",
      label: "תמונת כיסוי",
      multiple: true,
    },
    {
      id: 15,
      name: "gallery",
      type: "text",
      label: "העלה תמונות לגלריה",
    },
  ];
  return (
    <>
      <div className={styles.days_div}>
        {days.map((day) => (
          <input
            type="button"
            className={styles.day}
            style={{
              background: choossDay.includes(day) ? "#537FE7" : "white",
            }}
            value={day}
            onClick={onClickDay}
          />
        ))}
      </div>
      <Select
        placeholder="חזרה"
        choossArray={repeat}
        name="repeat"
        setValues={setRepeatDay}
      />
      {event.map((input) => {
        if (input.type !== "select")
          return (
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              className={styles.inputs}
            />
          );
        else
          return (
            <Select
              {...input}
              placeholder={input.placeholder}
              value={values[input.name]}
              values={values}
              setValues={setValues}
              key={input.id}
              name={input.name}
              choossArray={
                input.name === "place"
                  ? choossArray["placeData"]
                  : input.name === "category"
                  ? choossArray["categoryData"]
                  : choossArray["targetAudienceData"]
              }
            />
          );
      })}
    </>
  );
};

export default PersonalEvent;

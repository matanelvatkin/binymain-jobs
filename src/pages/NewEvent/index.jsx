import { useContext, useEffect, useRef, useState } from "react";
import { settingsContext } from "../../layout/Layout";
import ClassicButton from "../../components/ClassicButton copy";
import Input from "../../components/Input";
import Select from "../../components/Select";
import SelectIcon from "../../components/SelectIcon";
import SelectInput from "../../components/SelectInput";
import styles from "./style.module.css";
import headerContext from "../../context/headerContext";
import apiCalls from "../../function/apiCalls";
import { useNavigate } from "react-router-dom";
import NoRepeatEvent from "../../components/NoRepeatEvent";
import NewEventPopup from "../../components/NewEventPopup";
import ToggleSwitch from "../../components/ToggleSwitch";
import beginDateUpdate from "../../function/beginDateUpdate";
import popUpContext from "../../context/popUpContext";
import { locations } from "../SearchEvent/translation";

export default function NewEvent({ style = {}, className = "", ...props }) {
  const [fileData, setFileData] = useState([]);
  const [newEventPopup, setNewEventPopup] = useState(false);
  const [isTheSubmitButtonPush, setIsTheSubmitButtonPush] = useState(false);
  const [isInputFormValid, setIsTheFormValid] = useState(false);
  const [checked, setChecked] = useState(false);
  // if the timeValidationOK is true, then the times are correct - the finish time is bigger than the beginning time, and the event is at least 1 hour.
  const [timeValidationOK, setTimeValidationOK] = useState(true);
  const ref = useRef();

  const {setPopUpText , setPopUp , setSaveEventMode} = useContext(popUpContext)


  const handleToggleSwitch = (e) => {
    setChecked(!checked);
    setValues({ ...values, isFree: checked });
  };

  const fileChangeHandler = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
    console.log(fileData);
  };
  const nav = useNavigate();
  const placeData = locations

  const [loading, setLoading] = useState(true);

  const paymentData = ["בתשלום", "בחינם"];
  const typeData = [
    "אירוע חד פעמי",
    "אירוע יומי",
    "אירוע שבועי",
    "בהתאמה אישית",
  ];

  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [constancy, setConstancy] = useState("אירוע חד פעמי");
  const settingContext = useContext(settingsContext);
  const { setHeader } = useContext(headerContext);
  setHeader("פרסם אירוע");
  const [values, setValues] = useState({
    eventName: "",
    summary: "",
    advertiserName: "",
    advertiserTel: "",
    advertiserEmail: "",
    isRepeated: false,
    repeatType: "אירוע חד פעמי",
    personalRepeatType: "",
    date: new Date(),
    repeatSettingsType: "endDate",
    repeatSettingsRepeatEnd: undefined,
    beginningTime: "18:00",
    finishTime: "20:00",
    place: "",
    registrationPageURL: "",
    categories: [{}],
    audiences: [{}],
    isFree: true,
    price: "",
    days: [],
    cardImageURL: "",
    coverImageURL: "",
    gallery: [],
  });

  const inputs = [
    {
      id: 1,
      name: "eventName",
      type: "text",
      // label: "שם האירוע",
      errorMessage: "שדה חובה!",
      placeholder: "שם האירוע",
      required: true,
    },
    {
      id: 2,
      name: "constancy",
      type: constancy || "אירוע חד פעמי",
    },
    {
      id: 3,
      name: "advanced",
      type: "button",
      errorMessage: "שדה חובה!",
      placeholder: "מתקדם",
      label: "מתקדם",
    },

    {
      id: 4,
      name: "place",
      type: "select",
      label: "מקום",
      errorMessage: "שדה חובה!",
      placeholder: "בחר מיקום",
      icon: "https://cdn3.iconfinder.com/data/icons/lineo-mobile/100/gps-256.png",
      required: true,
    },
    {
      id: 5,
      name: "beginningTime",
      type: "time",
      label: "זמן התחלה",
      errorMessage: "שדה חובה!",
      placeholder: "זמן התחלה",
      required: true,
    },
    {
      id: 51,
      name: "timeValidationOK",
      type: "pTimeValidationOK",
    },
    {
      id: 6,
      name: "finishTime",
      type: "time",
      label: "זמן סיום",
      errorMessage: "שדה חובה!",
      placeholder: "זמן סיום",
      required: true,
    },
    {
      id: 7,
      name: "payment",
      type: "toogleSwitch",
      label: "עלות",
      errorMessage: "שדה חובה!",
      placeholder: "עלות",
      icon: "https://cdn4.iconfinder.com/data/icons/tabler-vol-3/24/currency-shekel-512.png",
      required: true,
    },
    {
      id: 1,
      name: "price",
      type: "text",
      placeholder: "מחיר",
      className: styles.priceNone,
    },

    // {
    //   id: 7,
    //   name: "repeatType",
    //   type: "select",
    //   label: "תדירות",
    //  erroreMesagge:"",
    //  placeholder: "אירוע ללא חזרה",
    // },

    {
      id: 8,
      name: "categories",
      type: "selectIcon",
      label: "קטגוריה",
      errorMessage: "יש לבחור קטגוריה",
      placeholder: "קטגוריה",
      required: true,
    },
    {
      id: 9,
      name: "audiences",
      type: "selectIcon",
      label: "קהל יעד",
      errorMessage: "יש לבחור קהל יעד",
      placeholder: "קהל יעד",
      required: true,
    },
    {
      id: 10,
      name: "summary",
      type: "text",
      // label: "תקציר",
      errorMessage: "שדה חובה!",
      placeholder: "תיאור האירוע",
      required: true,
    },
    {
      id: 11,
      name: "registrationPageURL",
      type: "url",
      // label: "דף הרשמה לאירוע",
      errorMessage: "שדה חובה!",
      placeholder: " לינק להרשמה/כרטיסים לאירוע",
      required: true,
    },
    {
      id: 12,
      name: "cardImageURL",
      type: "file",
      errorMessage: "שדה חובה!",
      instructions: "*מומלץ להעלות תמונה מרובעת 1:1",
      label: "תמונת אירוע",
      accept: "image/*",
      required: true,
    },
    {
      id: 13,
      name: "coverImageURL",
      type: "file",
      errorMessage: "שדה חובה!",
      instructions: "*מומלץ להעלות תמונה מלבנית 16:9",

      label: "תמונת כיסוי",
      accept: "image/*",
      required: true,
    },
    // {
    //   id: 14,
    //   name: "gallery",
    //   type: "file",
    //   label: "העלה תמונות לגלריה",
    //   multiple: true,
    // accept: "image/*",
    // },

    {
      id: 15,
      name: "advertiserName",
      type: "text",
      // label: "שם המפרסם",
      errorMessage: "שדה חובה!",
      placeholder: "שם המפרסם",
      required: true,
    },
    {
      id: 16,
      name: "advertiserTel",
      type: "tel",
      // label: "טלפון",
      errorMessage: "שדה חובה! יש להזין מספר תקין",
      placeholder: "טלפון",
      required: true,
      pattern: "^[0-9]{8,15}$",
    },
    {
      id: 17,
      name: "advertiserEmail",
      type: "email",
      // label: "מייל",
      errorMessage: "שדה חובה! יש להזין אימייל תקין",
      placeholder: "מייל",
      required: true,
    },
  ];

  const [eventData, setEventData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    // הכנסת שעת התחלה לתאריך ולתאריך סיום
    values.date = beginDateUpdate(values.date,values.beginningTime)
    if(values.repeatSettingsRepeatEnd instanceof Date){values.repeatSettingsRepeatEnd= beginDateUpdate(values.repeatSettingsRepeatEnd ,values.beginningTime)}

    const formElement = e.target;
    // const isValid = formElement.checkValidity();
    formElement.classList.add(styles.submitted);
    const firstInvalidField = formElement.querySelector(":invalid");
    firstInvalidField?.focus();

    if (!isInputFormValid) {
      console.log("invalid");
    } else {
      const formData = new FormData();
      for (const key in fileData) {
        if (Array.isArray(fileData[key])) {
          for (const file of fileData[key]) {
            formData.append(key, file);
          }
        } else {
          formData.append(key, fileData[key]);
        }
        console.log("fileData", fileData);
      }
      formData.append(
        "values",
        JSON.stringify({
          eventName: values.eventName,
          summary: values.summary,
          advertiser: {
            name: values.advertiserName,
            tel: values.advertiserTel,
            email: values.advertiserEmail,
          },
          date: values.date,
          day: values.days,
          beginningTime: values.beginningTime,
          finishTime: values.finishTime,
          place: values.place,
          categories: values.categories,
          audiences: values.audiences,
          registrationPageURL: values.registrationPageURL,
          cardImageURL: values.cardImageURL,
          coverImageURL: values.coverImageURL,
          gallery: values.gallery,
          repeatType: values.repeatType,
          personalRepeat: values.personalRepeatType,
          isReapeated: values.repeatType !== "אירוע ללא חזרה",
          payment: {
            isFree: values.isFree,
          },
          repeatSettings: {
            type: values.repeatSettingsType,
            repeatEnd: values.repeatSettingsRepeatEnd || values.date,
          },
        })
      );

      console.log([...formData.entries()]);

      apiCalls("post", "/event/createvent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        if (res._id != "") {
          setSaveEventMode(true)
          setPopUpText("האירוע שרצית לפרסם נקלט במערכת נודיע לך ברגע שמנהל המערכת יאשר את פרסומו");
          setPopUp(true)
          const newEventId = res._id;
          nav(`/`);
        }
      });
    }
  };

  useEffect(() => {
    setConstancy(values.repeatType);
    setValues({
      ...values,
      repeatSettingsType: "endDate",
      repeatSettingsRepeatEnd: undefined,
      days: [],
      personalRepeatType: undefined,
      date: new Date(),
    });
  }, [values.repeatType]);

  useEffect(() => {
    setAudiences(() => [...settingContext.audiences]);
    setCategories(() => [...settingContext.categories]);
  }, [settingContext.audiences, settingContext.categories]);
  useEffect(() => {}, [values]);

  const onChange = (e) => {
    console.log({ isInputFormValid, values });
    setValues({ ...values, [e.target.name]: e.target.value });
    if (
      values.eventName &&
      values.summary &&
      values.advertiserName &&
      values.advertiserTel &&
      values.advertiserEmail &&
      values.categories[0] &&
      values.audiences[0] &&
      values.registrationPageURL &&
      values.cardImageURL &&
      values.coverImageURL
    ) {
      setIsTheFormValid(true);
      console.log({ isInputFormValid });
    }
    if (e.target.name === "beginningTime" || e.target.name === "finishTime") {
      if (values.finishTime <= values.beginningTime) {
        setTimeValidationOK(false);
      } else {
        setTimeValidationOK(true);
      }
    }
    if (e.target.type === "file")
      setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
  };

  const formattedDate = new Date(values.date).toLocaleDateString("he-IL", {
    weekday: 'long',
    // day: 'numeric',
    // month: 'long',
    timeZone: 'UTC',
    numberingSystem: 'latn'
  });
  useEffect(() => {
    if (
      values.eventName &&
      values.summary &&
      values.advertiserName &&
      values.advertiserTel &&
      values.advertiserEmail &&
      values.categories[0] &&
      values.audiences[0] &&
      values.registrationPageURL &&
      values.cardImageURL &&
      values.coverImageURL
    ) {
      setIsTheFormValid(true);
      console.log({ isInputFormValid });
    }
  }, [isInputFormValid]);
  function SubmitButton() {
    return (
      <div className={styles.button}>
        <ClassicButton width={"200px"} text={"שמור"} type={"submit"} />
      </div>
    );
  }
  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.header}>כאן מכניסים את כל פרטי האירוע שלך</div>{" "}
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
        encType="multipart/form-data"
      >
        {inputs.map((input) => {
          if (input.type === "select")
            return (
              <SelectInput
                errorMessage={input.errorMessage}
                key={input.id}
                placeholder={input.placeholder}
                value={values[input.name]}
                name={input.name}
                values={values}
                setValues={setValues}
                isTheSubmitButtonPush={isTheSubmitButtonPush}
                choossArray={input.name === "repeatType" ? typeData : placeData}
                {...input}
              />
            );
          else if (input.type === "selectIcon") {
            return (
              <div className={styles.selectIcon}>
                <div className={styles.iconLabel}>{input.label}</div>
                <SelectIcon
                  {...input}
                  isTheSubmitButtonPush={isTheSubmitButtonPush}
                  errorMessage={input.errorMessage}
                  inText={false}
                  key={input.id}
                  value={values[input.name]}
                  name={input.name}
                  values={values}
                  setValues={setValues}
                  array={input.name === "categories" ? categories : audiences}
                  setArray={
                    input.name === "categories" ? setCategories : setAudiences
                  }
                />
              </div>
            );
          } else if (input.type === "select")
            return (
              <Select
                {...input}
                errorMessage={input.errorMessage}
                key={input.id}
                placeholder={input.placeholder}
                value={values[input.name]}
                name={input.name}
                values={values}
                setValues={setValues}
                isTheSubmitButtonPush={isTheSubmitButtonPush}
                choossArray={
                  input.name === "repeatType" ? typeData : paymentData
                }
              />
            );
          else if (input.type === "אירוע חד פעמי")
            return (
              <div className={styles.date}>
                {" "}
                <NoRepeatEvent values={values} setValues={setValues} />
              </div>
            );
          else if (input.type === "button")
            return (
              <div
                className={styles.advanced}
                onClick={() => setNewEventPopup(true)}
              >
                
              <u> {`${constancy} ${constancy !== "אירוע חד פעמי" ? formattedDate : "" }`}</u>           
              </div>
            );
          else if (input.type == "toogleSwitch")
            return (
              <ToggleSwitch
                text="בתשלום"
                checked={checked}
                onChange={handleToggleSwitch}
              />
            );
          else if (input.type == "pTimeValidationOK")
            return (
              <p
                className={
                  timeValidationOK ? styles.priceNone : styles.priceInline
                }
              >
                משך האירוע - שעה לפחות
              </p>
            );
          else
            return (
              <Input
                key={input.id}
                {...input}
                errorMessage={input.errorMessage}
                instructions={input.instructions}
                value={values[input.name]}
                onChange={onChange}
                className={input.className}
                type={input.type}
                width={"240px"}
                isTheSubmitButtonPush={isTheSubmitButtonPush}
              />
            );
        })}

        {newEventPopup && (
          <NewEventPopup
            setNewEventPopup={setNewEventPopup}
            values={values}
            setValues={setValues}
            constancy={constancy}
            setConstancy={setConstancy}
          />
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

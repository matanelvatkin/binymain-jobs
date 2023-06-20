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
import { FaShekelSign } from "react-icons/fa";
import DateInput from "../../components/DateInput";
import NewEventPopup from "../../components/NewEventPopup";
import ToggleSwitch from "../../components/ToggleSwitch";
import beginDateUpdate from "../../function/beginDateUpdate";
import popUpContext from "../../context/popUpContext";
import { locations } from "../SearchEvent/translation";
import { timeValidation } from "./timeValidation";
import MultiSelect from "../../components/MultiSelect";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function NewEvent({ style = {}, className = "", ...props }) {
  const [fileData, setFileData] = useState([]);
  const [newEventPopup, setNewEventPopup] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isInputFormValid, setIsInputFormValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectRequired, setSelectRequired] = useState(false);
  const [isTheSubmitButtonPush, setIsTheSubmitButtonPush] = useState(false);
  const [submittedForDisableButton, setSubmittedForDisableButton] =
    useState(false);
  // if the timeValidationOK is true, then the times are correct - the finish time is bigger than the beginning time, and the event is at least 1 hour.
  const [timeValidationOK, setTimeValidationOK] = useState(true);
  const [timeValidationMessage, setTimeValidationMessage] = useState("");

  const ref = useRef();

  const { setPopUpText, setPopUp, setSaveEventMode } = useContext(popUpContext);

  const handleToggleSwitch = (e) => {
    setChecked(!checked);
    setValues({ ...values, isFree: checked });
  };

  // const fileChangeHandler = (e) => {
  //   setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
  //   console.log(fileData);
  // };
  const nav = useNavigate();
  const placeData = locations.map((i) => {
    return { value: i, label: i };
  });
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
  // const [values, setValues] = useState({
  //   eventName: sessionStorage.getItem("eventName"),
  //   summary: sessionStorage.getItem("summary"),
  //   advertiserName: sessionStorage.getItem("advertiserName"),
  //   advertiserTel: sessionStorage.getItem("advertiserTel"),
  //   advertiserEmail: sessionStorage.getItem("advertiserEmail"),
  //   isRepeated: false,
  //   repeatType: "אירוע חד פעמי",
  //   personalRepeatType: "",
  //   date: new Date(),
  //   repeatSettingsType: "endDate",
  //   repeatSettingsRepeatEnd: undefined,
  //   beginningTime: "18:00",
  //   finishTime: "20:00",
  //   place: sessionStorage.getItem("place"),
  //   accuratelocation: sessionStorage.getItem("accuratelocation"),
  //   registrationPageURL: sessionStorage.getItem("registrationPageURL"),
  //   categories: [{}],
  //   audiences: [{}],
  //   isFree: true,
  //   price: sessionStorage.getItem("price"),
  //   days: [],
  //   cardImageURL: sessionStorage.getItem("cardImageURL"),
  //   coverImageURL: sessionStorage.getItem("coverImageURL"),
  //   gallery: [],
  // });
  const [values, setValues] = useState({
    eventName: sessionStorage.getItem("eventName"),
    summary: sessionStorage.getItem("eventName"),
    advertiserName: sessionStorage.getItem("advertiserName"),
    advertiserTel: sessionStorage.getItem("advertiserTel"),
    advertiserEmail: sessionStorage.getItem("advertiserEmail"),
    isRepeated: false,
    repeatType: "אירוע חד פעמי",
    personalRepeatType: "",
    date: "",
    repeatSettingsType: "endDate",
    repeatSettingsRepeatEnd: undefined,
    beginningTime: !sessionStorage.getItem("beginningTime")
      ? "18:00"
      : sessionStorage.getItem("beginningTime"),
    finishTime: !sessionStorage.getItem("finishTime")
      ? "20:00"
      : sessionStorage.getItem("finishTime"),

    place: sessionStorage.getItem("place"),
    accuratelocation: sessionStorage.getItem("accuratelocation"),
    registrationPageURL: sessionStorage.getItem("registrationPageURL"),
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
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "שם האירוע",
      className: "form-control",
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
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "מתקדם",
      label: "מתקדם",
    },

    {
      id: 4,
      name: "place",
      type: "select",
      label: "מקום",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "בחר מיקום",
      className: "form-control",
      icon: "https://cdn3.iconfinder.com/data/icons/lineo-mobile/100/gps-256.png",
      required: true,
    },
    {
      id: 5,
      name: "accuratelocation",
      type: "text",
      errorMessage: "אוי שכחת למלא כאן את פרטים",
      placeholder: "מיקום מדויק או כתובת",
      className: "form-control",
      required: true,
    },
    {
      id: 6,
      name: "beginningTime",
      type: "time",
      label: "מתי האירוע מתחיל?",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "זמן התחלה",
      className: "form-control",
      required: true,
    },
    {
      id: 51,
      name: "timeValidationOK",
      type: "pTimeValidationOK",
    },
    {
      id: 7,
      name: "finishTime",
      type: "time",
      label: "מתי האירוע מסתיים?",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "זמן סיום",
      className: "form-control",
      required: true,
    },
    {
      id: 8,
      name: "payment",
      type: "toogleSwitch",
      label: "עלות",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "עלות",
      className: "form-control",
      icon: "https://cdn4.iconfinder.com/data/icons/tabler-vol-3/24/currency-shekel-512.png",
      required: true,
    },
    // {
    //   id: 1,
    //   name: "price",
    //   type: "text",
    //   placeholder: "מחיר",
    // },

    // {
    //   id: 7,
    //   name: "repeatType",
    //   type: "select",
    //   label: "תדירות",
    //  erroreMesagge:"",
    //  placeholder: "אירוע ללא חזרה",
    // },

    {
      id: 9,
      name: "categories",
      type: "selectIcon",
      label: "קטגוריה",
      errorMessage: "אוי שכחת למלא כאן את פרטים",
      placeholder: "קטגוריה",
      required: true,
    },
    {
      id: 10,
      name: "audiences",
      type: "selectIcon",
      label: "קהל יעד",
      errorMessage: "אוי שכחת למלא כאן את פרטים",
      placeholder: "קהל יעד",
      required: true,
    },
    {
      id: 11,
      name: "summary",
      type: "text",
      // label: "תקציר",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: "תיאור האירוע",
      className: "form-control",
      required: true,
    },
    {
      id: 12,
      name: "registrationPageURL",
      type: "url",
      // label: "דף הרשמה לאירוע",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      placeholder: " לינק להרשמה/כרטיסים לאירוע",
      className: "form-control",
      required: true,
    },
    {
      id: 13,
      name: "cardImageURL",
      type: "file",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      instructions: "*מומלץ להעלות תמונה מרובעת 1:1",
      label: "תמונת אירוע",
      accept: "image/*",
      className: "form-control",
      required: true,
    },
    {
      id: 14,
      name: "coverImageURL",
      type: "file",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
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
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      placeholder: "שם המפרסם",
      required: true,
    },
    {
      id: 16,
      name: "advertiserTel",
      type: "tel",
      // label: "טלפון",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      placeholder: "טלפון",
      required: true,
      pattern: "^[0-9]{8,15}$",
    },
    {
      id: 17,
      name: "advertiserEmail",
      type: "email",
      // label: "מייל",
      errorMessage: "אוי שכחת למלא כאן את הפרטים",
      className: "form-control",
      placeholder: "מייל",
      required: true,
    },
  ];

  const [eventData, setEventData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsTheSubmitButtonPush(true);
    setSubmittedForDisableButton(true);
    console.log(submittedForDisableButton);
    // הכנסת שעת התחלה לתאריך ולתאריך סיום
    values.date = beginDateUpdate(values.date, values.beginningTime);
    if (values.repeatSettingsRepeatEnd instanceof Date) {
      values.repeatSettingsRepeatEnd = beginDateUpdate(
        values.repeatSettingsRepeatEnd,
        values.beginningTime
      );
    }
    const formElement = e.target;
    // if (values.categories[0] === null) {
    //   const categoriesInvalid = formElement.querySelector("categories");
    //   categoriesInvalid?.focus();
    // }
    setIsValid(formElement.checkValidity());
    if (!values.place) setSelectRequired(true);
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
          accuratelocation: values.accuratelocation,
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
          setSaveEventMode(true);
          sessionStorage.clear();
          setPopUpText(
            "האירוע שרצית לפרסם נקלט במערכת נודיע לך ברגע שמנהל המערכת יאשר את פרסומו"
          );
          setPopUp(true);
          nav(`/`);
        }
      });
    }
  };

  useEffect(() => {
    if (timeValidationMessage !== "") setTimeValidationOK(false);
    else setTimeValidationOK(true);
  }, [timeValidationMessage]);

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
  // useEffect(() => {}, [values]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    sessionStorage.setItem(e.target.name, e.target.value);
    setSubmittedForDisableButton(false);

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
      setIsInputFormValid(true);
      console.log({ isInputFormValid });
    }

    //if the targeted input is the beginningTime or finishingTime then- we make a validation check.

    if (e.target.name === "beginningTime" || e.target.name === "finishTime") {
      //set the beginning and finishing time from the values object
      const beginningTimeObj = new Date("2000-01-01T" + values.beginningTime);
      const finishingTimeObj = new Date("2000-01-01T" + values.finishTime);

      //update the beginningTimeObj or the finishingTimeObj according to the targeted value.
      const [hours, minutes] = e.target.value.split(":");

      if (e.target.name === "beginningTime") {
        beginningTimeObj.setHours(hours);
        beginningTimeObj.setMinutes(minutes);
      } else {
        finishingTimeObj.setHours(hours);
        finishingTimeObj.setMinutes(minutes);
      }
      setTimeValidationMessage(
        timeValidation(beginningTimeObj, finishingTimeObj)
      );
    }
    if (e.target.type === "file")
      setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
    // const fileToStorage = JSON.stringify(e.target.files[0].name);
    // console.log(fileToStorage);
    // sessionStorage.setItem(e.target.name, fileToStorage);
  };
  // useEffect(() => {
  //   for (const key in values) {
  //     setValues({ ...values, [key]: sessionStorage.getItem([key]) });
  //     console.log(values);
  //   }
  // }, [values]);
  const formattedDate = new Date(values.date).toLocaleDateString("he-IL", {
    weekday: "long",
    // day: 'numeric',
    // month: 'long',
    timeZone: "UTC",
    numberingSystem: "latn",
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
      setIsInputFormValid(true);
      console.log({ isInputFormValid });
    }
    // else {
    //       if (!values.eventName) {
    //         console.log(`${values.eventName} is invalid`);
    //       }
    //
    //       if (!values.summary) {
    //         console.log(`${values.summary} is invalid`);
    //       }
    //
    //       if (!values.advertiserName) {
    //         console.log(`${values.advertiserName} is invalid`);
    //       }
    //
    //       if (!values.advertiserTel) {
    //         console.log(`${values.advertiserTel} is invalid`);
    //       }
    //
    //       if (!values.advertiserEmail) {
    //         console.log(`${values.advertiserEmail} is invalid`);
    //       }
    //
    //       if (!values.categories[0]) {
    //         console.log(`${values.categories} is invalid`);
    //       }
    //
    //       if (!values.audiences[0]) {
    //         console.log(`${values.audiences} is invalid`);
    //       }
    //
    //       if (!values.registrationPageURL) {
    //         console.log(`${values.registrationPageURL} is invalid`);
    //       }
    //
    //       if (!values.cardImageURL) {
    //         console.log(`${values.cardImageURL} is invalid`);
    //       }
    //
    //       if (!values.coverImageURL) {
    //         console.log(`${values.coverImageURL} is invalid`);
    //       }
    //     }
  }, [onChange]);

  function SubmitButton() {
    if (isInputFormValid && submittedForDisableButton) {
      return (
        <div className={styles.button}>
          <ClassicButton
            width={"200px"}
            text={"נשלח לפרסום, אנא המתן"}
            type={"submit"}
            disabled={true}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.button}>
          <ClassicButton width={"200px"} text={"שמור"} type={"submit"} />
        </div>
      );
    }
  }

  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.header}>
        כמה פרטים כדי שנוכל לפרסם את האירוע שלך
      </div>{" "}
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.form}
        encType="multipart/form-data"
      >
        {inputs.map((input) => {
          if (input.type === "select")
            return (
              <MultiSelect
                errorMessage={input.errorMessage}
                key={input.id}
                placeholder={input.placeholder}
                value={values[input.name]}
                name={input.name}
                values={values}
                setValues={setValues}
                isValid={isValid}
                selectRequired={selectRequired}
                setSelectRequired={setSelectRequired}
                isTheSubmitButtonPush={isTheSubmitButtonPush}
                setIsTheSubmitButtonPush={setIsTheSubmitButtonPush}
                options={input.name === "repeatType" ? typeData : placeData}
                {...input}
              />
            );
          else if (input.type === "selectIcon") {
            return (
              <div className={styles.selectIcon}>
                <div className={styles.iconLabel}>{input.label}</div>
                <SelectIcon
                  isValid={isValid}
                  errorMessage={input.errorMessage}
                  inText={false}
                  key={input.id}
                  value={values[input.name]}
                  name={input.name}
                  values={values}
                  setValues={setValues}
                  isTheSubmitButtonPush={isTheSubmitButtonPush}
                  array={input.name === "categories" ? categories : audiences}
                  setArray={
                    input.name === "categories" ? setCategories : setAudiences
                  }
                  {...input}
                />
              </div>
            );
          } else if (input.type === "אירוע חד פעמי")
            return (
              <div className={styles.date}>
                {" "}
                <NoRepeatEvent values={values} setValues={setValues} />
              </div>
            );
          else if (input.type == "pTimeValidationOK")
            return (
              <p className={styles.errorMessage}>{timeValidationMessage}</p>
            );
          else if (input.type === "button")
            return (
              <div
                className={styles.advanced}
                onClick={() => setNewEventPopup(true)}
              >
                <u>
                  {" "}
                  {`${constancy} ${
                    constancy !== "אירוע חד פעמי" ? formattedDate : ""
                  }`}
                </u>
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
          else
            return (
              <Input
                key={input.id}
                errorMessage={input.errorMessage}
                instructions={input.instructions}
                value={values[input.name]}
                onChange={onChange}
                isValid={isValid}
                className={input.className}
                type={input.type}
                width={"240px"}
                {...input}
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

import { useContext, useEffect, useState } from "react";
import { settingsContext } from "../../layout/Layout";
import ClassicButton from "../../components/ClassicButton copy";
import Input from "../../components/Input";
import Select from "../../components/Select";
import SelectIcon from "../../components/SelectIcon";
import styles from "./style.module.css";
import headerContext from "../../context/headerContext";
import apiCalls from "../../function/apiCalls";
import { useNavigate } from "react-router-dom";
import PersonalEvent from "../../components/PersonalEvent";
import WeeklyEvent from "../../components/WeeklyEvent";
import DailyEvent from "../../components/DailyEvent";
import NoRepeatEvent from "../../components/NoRepeatEvent";
import { FaShekelSign } from "react-icons/fa";
import DateInput from "../../components/DateInput";
import NewEventPopup from "../../components/NewEventPopup";
import ToggleSwitch from "../../components/ToggleSwitch";
export default function NewEvent({ style = {}, className = "", ...props }) {
  const [fileData, setFileData] = useState([]);
  const [newEventPopup, setNewEventPopup] = useState(false);

  const fileChangeHandler = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
    console.log(fileData);
  };
  const nav = useNavigate();
  const placeData = [
    "עלמון",
    "עמיחי",
    "עטרת",
    "בית חורון",
    "דולב",
    "עלי",
    "גני מודיעין",
    "גבע בנימין",
    "גבעון החדשה",
    "חשמונאים",
    "כפר אדומים",
    "כפר האורנים",
    "כוכב השחר",
    "כוכב יעקב",
    "מעלה לבונה",
    "מעלה מכמש",
    "מתתיהו",
    "מבוא חורון",
    "מצפה יריחו",
    "נעלה",
    "נחליאל",
    "נוה צוף",
    `ניל"י`,
    "עופרה",
    "פסגות",
    "רימונים",
    "שילה",
    "טלמון",
  ];
  const [loading, setLoading] = useState(true);

  const paymentData = ["בתשלום", "בחינם"];
  const typeData = [
    "אירוע ללא חזרה",
    "אירוע יומי",
    "אירוע שבועי",
    "בהתאמה אישית",
  ];

  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [constancy, setConstancy] = useState("אירוע ללא חזרה");
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
    repeatType: "אירוע ללא חזרה",
    personalRepeatType: "",
    date: new Date(),
    repeatSettingsType: "endDate",
    repeatSettingsRepeatEnd: undefined,
    beginningTime: "18:00",
    finishTime: "20:00",
    place: "",
    registrationPageURL: "",
    categories: [],
    audiences: [],
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
      placeholder: "שם האירוע",
      required: true,
    },
    {
      id: 2,
      name: "constancy",
      type: constancy || "אירוע ללא חזרה",
    },
    {
      id: 3,
      name: "advanced",
      type: "button",
      placeholder: "מתקדם",
      label: "מתקדם",
    },

    {
      id: 4,
      name: "place",
      type: "select",
      label: "מקום",
      placeholder: "בחר מיקום",
      icon: "https://cdn3.iconfinder.com/data/icons/lineo-mobile/100/gps-256.png",
      required: true,
    },
    {
      id: 5,
      name: "beginningTime",
      type: "time",
      label: "זמן התחלה",
      placeholder: "זמן התחלה",
      required: true,
    },
    {
      id: 6,
      name: "finishTime",
      type: "time",
      label: "זמן סיום",
      placeholder: "זמן סיום",
      required: true,
    },
    {
      id: 7,
      name: "payment",
      type: "toogleSwitch",
      label: "עלות",
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
    //   placeholder: "אירוע ללא חזרה",
    // },

    {
      id: 8,
      name: "category",
      type: "selectIcon",
      label: "קטגוריה",
      placeholder: "קטגוריה",
      required: true,
    },
    {
      id: 9,
      name: "audiences",
      type: "selectIcon",
      label: "קהל יעד",
      placeholder: "קהל יעד",
      required: true,
    },
    {
      id: 10,
      name: "summary",
      type: "text",
      // label: "תקציר",
      placeholder: "תקציר",
      required: true,
    },
    {
      id: 11,
      name: "registrationPageURL",
      type: "text",
      // label: "דף הרשמה לאירוע",
      placeholder: " לינק להרשמה/כרטיסים לאירוע",
      required: true,
    },
    {
      id: 12,
      name: "cardImageURL",
      type: "file",
      label: "תמונת אירוע",
      required: true,
    },
    {
      id: 13,
      name: "coverImageURL",
      type: "file",
      label: "תמונת כיסוי",
      required: true,
    },
    // {
    //   id: 14,
    //   name: "gallery",
    //   type: "file",
    //   label: "העלה תמונות לגלריה",
    //   multiple: true,
    // },
    {
      id: 15,
      name: "advertiserName",
      type: "text",
      // label: "שם המפרסם",
      placeholder: "שם המפרסם",
      required: true,
    },
    {
      id: 16,
      name: "advertiserTel",
      type: "text",
      // label: "טלפון",
      placeholder: "טלפון",
      required: true,
    },
    {
      id: 17,
      name: "advertiserEmail",
      type: "email",
      // label: "מייל",
      placeholder: "מייל",
      required: true,
    },
  ];

  const [eventData, setEventData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

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
        payment: values.payment,
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
        const newEventId = res._id;
        nav(`/`);
      }
    });
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
  useEffect(() => {
    console.log({ values });
  }, [values]);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
    console.log("file", fileData);
  };

  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      {" "}
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        encType="multipart/form-data"
      >
        {inputs.map((input) => {
          if (input.type === "select")
            return (
              <Select
                {...input}
                key={input.id}
                placeholder={input.placeholder}
                value={values[input.name]}
                name={input.name}
                values={values}
                setValues={setValues}
                choossArray={input.name === "repeatType" ? typeData : placeData}
              />
            );
          else if (input.type === "selectIcon") {
            console.log(input);
            return (
              <SelectIcon
                {...input}
                inText={false}
                key={input.id}
                value={values[input.name]}
                name={input.name}
                values={values}
                setValues={setValues}
                array={input.name === "category" ? categories : audiences}
                setArray={
                  input.name === "category" ? setCategories : setAudiences
                }
              />
            );
          } else if (input.type === "select")
            return (
              <Select
                {...input}
                key={input.id}
                placeholder={input.placeholder}
                value={values[input.name]}
                name={input.name}
                values={values}
                setValues={setValues}
                choossArray={
                  input.name === "repeatType" ? typeData : paymentData
                }
              />
            );
          else if (input.type === "אירוע ללא חזרה")
            return <NoRepeatEvent values={values} setValues={setValues} />;
          else if (input.type === "button")
            return <div onClick={() => setNewEventPopup(true)}>מתקדם</div>;
          else if (input.type === "toogleSwitch")
            return <ToggleSwitch text="בתשלום" />;
          else
            return (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                className={input.className}
                type={input.type}
                width={"240px"}
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

        <div className={styles.button}>
          <ClassicButton width={"200px"} text={"שמור"} type={"submit"} />
        </div>
      </form>
    </div>
  );
}

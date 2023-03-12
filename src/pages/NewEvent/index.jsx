import { useState } from "react";
import ClassicButton from "../../components/ClassicButton copy";
import Input from "../../components/Input";
import SecondHeader from "../../components/SecondHeader";
import Select from "../../components/Select";
import styles from "./style.module.css";
import headerContext from "../../context/headerContext";
import axios from 'axios';


export default function NewEvent({ style = {}, className = "", ...props }) {
  const { setHeader, header } = headerContext;
  const [prevValues, setPrevValues] = useState([]);
  const [values, setValues] = useState({
    eventName: "",
    summary: "",
    advertiser: "",
    tel: "",
    email: "",
    date: "",
    beginningTime: "",
    finishTime: "",
    place: "",
    category: "",
    targetAudience: "",
    registrationPageUrl: "",
    cardImageUrl: "",
    coverImageUrl: "",
    gallery: "",
    type: "",
    payment: "",
  });

  const inputs = [
    {
      id: 1,
      name: "eventName",
      type: "text",
      label: "שם האירוע",
    },
    {
      id: 2,
      name: "summary",
      type: "text",
      label: "תקציר",
    },
    {
      id: 3,
      name: "advertiser",
      type: "text",
      label: "שם המפרסם",
    },
    {
      id: 4,
      name: "tel",
      type: "text",
      label: "טלפון",
    },
    {
      id: 5,
      name: "email",
      type: "email",
      label: "מייל",
    },
    {
      id: 6,
      name: "date",
      type: "date",
      label: "תאריך",
    },
    {
      id: 7,
      name: "beginningTime",
      type: "time",
      label: "זמן התחלה",
    },
    {
      id: 8,
      name: "finishTime",
      type: "time",
      label: "זמן סיום",
    },
    {
      id: 9,
      name: "place",
      type: "select",
      label: "מקום",
      placeholder: "מיקום",
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
    },
    {
      id: 13,
      name: "cardImageURL",
      type: "file",
      label: "תמונת אירוע",
    },
    {
      id: 14,
      name: "coverImageURL",
      type: "file",
      label: "תמונת כיסוי",
    },
    {
      id: 15,
      name: "gallery",
      type: "file",
      label: "העלה תמונות לגלריה",
    },
    {
      id: 16,
      name: "type",
      type: "select",
      label: "תדירות",
      placeholder: "תדירות",
    },
    {
      id: 17,
      name: "payment",
      type: "select",
      label: "עלות",
      placeholder: "עלות",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in values) {
      if (Array.isArray(values[key])) {
        for (const file of values[key]) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, values[key]);
      }
    }
    console.log(formData);
    axios.post('http://localhost:8080/event', formData)
    .then(()=>{
        window.location.reload(false);
    })
  };

  const onChange = (e) => {
    if (e.target.type === "file") {
      const files = e.target.value;
      setValues({...values, [e.target.name]: files});
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

//   const createEvent = () => {
//     axios.post('http://localhost:3001/event', formData)
//     .then(()=>{
//         window.location.reload(false);
//     })
// }

  console.log(header);
  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      {/* <SecondHeader /> */}
      <form 
      onSubmit={handleSubmit}
      className={styles.form}
      enctype="multipart/form-data" 
      >
        {inputs.map((input) => {
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
          else return <Select placeholder={input.placeholder} />;
        })}

        <div className={styles.button}>
          <ClassicButton width={"200px"} text={"Save"} type={'submit'}/>
        </div>
      </form>
    </div>
  );
}

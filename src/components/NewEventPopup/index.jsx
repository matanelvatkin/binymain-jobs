import React, { useContext, useState } from 'react'
import popUpContext from '../../context/popUpContext';
import styles from "./style.module.css";
import PersonalEvent from '../PersonalEvent';
import Select from '../Select';
import DailyEvent from '../DailyEvent';
import WeeklyEvent from '../WeeklyEvent';

function NewEventPopup({ setNewEventPopup, values, setValues, constancy, setConstancy }) {
  const { setPopUp } = useContext(popUpContext)


  const cencelPopup = () => {
    setConstancy("משרה או התנדבות ללא חזרה")
    setNewEventPopup(false)

  };
  const handleInnerDivClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the outer div
  };

  return (
    <div onClick={cencelPopup} className={styles.container}>
      <div className={styles.popup} onClick={(e) => handleInnerDivClick(e)}>
        <form className={styles.form} action="">
          <div className={styles.select}>
          <Select
            placeholder={"משרה או התנדבות יומית"}
            value={values.repeatType}
            name={"repeatType"}
            values={values}
            setValues={setValues}
            choossArray={["משרה או התנדבות יומית", "משרה או התנדבות שבועית", "בהתאמה אישית"]}
          />
          </div>
          <div className={styles.p}>
             {values.repeatType === "משרה או התנדבות יומית" ?
            <DailyEvent values={values} setValues={setValues} />
            : values.repeatType === "משרה או התנדבות שבועית" ?
              <WeeklyEvent values={values} setValues={setValues} /> :
              values.repeatType === "בהתאמה אישית" ?
                <PersonalEvent values={values} setValues={setValues} /> : console.log("asd")}
          </div>
         
        </form>

      </div>

    </div>
  )
}

export default NewEventPopup





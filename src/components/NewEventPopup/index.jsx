import React, { useContext, useState } from 'react'
import popUpContext from '../../context/popUpContext';
import styles from "./style.module.css";
import PersonalEvent from '../PersonalEvent';
import Select from '../Select';
import DailyEvent from '../DailyEvent';
import WeeklyEvent from '../WeeklyEvent';
import {TiDelete} from 'react-icons/ti'
import NoRepeatEvent from '../NoRepeatEvent';

function NewEventPopup({ setNewEventPopup, values, setValues, constancy, setConstancy }) {
  const { setPopUp } = useContext(popUpContext)


  const cencelPopup = () => {
    setConstancy("אירוע חד פעמי")
    setNewEventPopup(false)
  };

 const submitPopup = () => {
  setConstancy(values.repeatType)
  setNewEventPopup(false)
 }

  const handleInnerDivClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the outer div
  };

  return (
    <div onClick={cencelPopup} className={styles.container}>
      <div className={styles.popup} onClick={(e) => handleInnerDivClick(e)}>
        {/* <TiDelete
         className={styles.x}
         onClick={cencelPopup}
         /> */}
        <form className={styles.form} action="">
          <div className={styles.select}>
          <Select
            placeholder={"אירוע יומי"}
            value={values.repeatType}
            name={"repeatType"}
            values={values}
            setValues={setValues}
            choossArray={["אירוע יומי", "אירוע שבועי", "בהתאמה אישית"]}
          />
          </div>
          <div className={styles.p}>
            {values.repeatType === "אירוע יומי" ?
            <DailyEvent values={values} setValues={setValues} />
            : values.repeatType === "אירוע שבועי" ?
              <WeeklyEvent values={values} setValues={setValues} /> :
              values.repeatType === "בהתאמה אישית" ?
                <PersonalEvent values={values} setValues={setValues} /> : console.log("asd")}
          </div>
         
        </form>
        <div className={styles.submitAndCancelBox}>
        <button onClick={submitPopup} className={styles.submit}>סיום</button>
        <button onClick={cencelPopup} className={styles.cancel}>ביטול</button>
        </div>
      </div>

    </div>
  )
}

export default NewEventPopup
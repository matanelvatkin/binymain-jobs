import styles from "./style.module.css";
import { useState, useEffect } from 'react';
import Input from "../Input";
import DateInput from "../DateInput";
import ClassicButton from "../ClassicButton copy";
import SelectDays from "../SelectDays";

//personalRepeatType, repeatSettingsEnd, repeatSettingsRepeatEnd,     days: [{}],


export default function Customized({values,setValues = () => { },...props}) {

    const [chooseDayOrWeek, setChooseDayOrWeek]= useState("weeks");
    const [numberTimes, setNumberTimes]= useState(1);
    const [chooseDays, setChooseDays]=useState([""]);
    const [repeatSettingsEnd, setRepeatSettingsEnd]= useState("endDate");
    const [repeatDateEnd, setRepeatDateEnd]= useState({});
    const [repeatTimesEnd, setRepeatTimesEnd]= useState(1)

    const[clickDay, setClickDay]= useState("") 
    const [isClicked, setIsClicked]=useState(false)


    // const chooseBack = (e) => {
    //   setChooseDayOrWeek(e.target.value);
    //   // setValues({ ...values, isRepeated: true, repeatType: "customized", personalRepeatType: e.target.value, });
    // };

    // const chooseNumber=(e)=>{
    // setNumberTimes(e.target.value)      
    // }

    useEffect(()=>{
    chooseDays.includes(clickDay)?
    setChooseDays(chooseDays.filter((day)=>day!==clickDay)):
    setChooseDays([...chooseDays, clickDay]);
    console.log(chooseDays)
  },
    [isClicked])


    function saveClick(){
      console.log(values)
    setValues({ ...values,
       isRepeated: true, repeatType: "customized",
       repeatTimes: numberTimes, 
       personalRepeatType: chooseDayOrWeek,
   days: chooseDays, 
   repeatSettingsEnd: repeatSettingsEnd,
   repeatDateEnd: repeatDateEnd|| new Date(),
   repeatTimesEnd:repeatTimesEnd||1 
});
  //  console.log(values)
    }


    const days = [{value: "א", day:0}, {value: "ב", day: 1}, {value:"ג", day:2},
    {value: "ד", day: 3}, {value: "ה", day:4 }, {value:"ו", day:5 }, {value:"ש", day: 6}];

return(
    <div className={styles.container}>
    <div>חזרה כל</div>
    <input type="number" min="1" max="30" 
    onInput={(e)=> setNumberTimes(e.target.value)}
    />
    <span><select
     onChange={(e)=>setChooseDayOrWeek(e.target.value)}
     >
<option value="weeks">שבועות</option>
<option value="days">ימים</option>
    </select>
          </span>

{chooseDayOrWeek==="weeks"&&

        <div className={styles.days_div}>
          {
            days.map((day)=><SelectDays days={day} setClickDay={setClickDay}
            isClicked={isClicked} setIsClicked={setIsClicked}/>)
          }


      </div> }

<div className={styles.end}>
  <div className={styles.headerEnd}>סיום</div>
        <div className={styles.endDateInputs}>
          <div className={styles.inDate}>
          <Input
            onChange={()=>setRepeatSettingsEnd("endDate")}
            label="ב-"
            type="radio"
            name="repeatEnd"
            value="endDate"
            isChecked={true}
          />
          </div>
          <span> <DateInput values={repeatDateEnd} setValues={setRepeatDateEnd} /></span>
          </div>

      <div className={styles.number}>
          <Input
            onChange={()=>setRepeatSettingsEnd("endNumTimes")}
            label="אחרי"
            type="radio"
            name="repeatEnd"
            value="endNumber"
          />
       <div className={styles.backNum}>
        <input type="number" 
        onInput={(e)=>setRepeatTimesEnd(e.target.value)}
        min="1" max="30"/>
        <span>חזרות</span>
       </div>
       
      </div>
    </div>

          <div className={styles.buttons}>
          <ClassicButton
          text="סיים"
          width="30%"
          func={saveClick}
          />

          <ClassicButton
          text="ביטול"
          width="30%"/>
        </div>
  </div>

)
}
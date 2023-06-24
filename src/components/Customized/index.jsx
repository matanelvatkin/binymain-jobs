import styles from "./style.module.css";
import { useState, useContext, useEffect } from 'react';
import headerContext from '../../context/headerContext';
import Input from "../Input";
import DateInput from "../DateInput";
import ClassicButton from "../ClassicButton copy";
import SelectDays from "../SelectDays";

//personalRepeatType, repeatSettingsEnd, repeatSettingsRepeatEnd,     days: [{}],


export default function Customized({values,setValues = () => { },...props}) {
    const { setHeader } = useContext(headerContext)
    // const [endRepeat, setEndRepeat] = useState({});
    const [chooseDayOrWeek, setChooseDayOrWeek]= useState("weeks");
    const [numberTimes, setNumberTimes]= useState();
    const [chooseDays, setChooseDays]=useState([""]);
    const [repeatSettingsEnd, setRepeatSettingsEnd]= useState("endDate");
    const [repeatEnd, setRepeatEnd]= useState();

    const[clickDay, setClickDay]= useState("") 
    const [isClicked, setIsClicked]=useState(false)


    const chooseBack = (e) => {
      setChooseDayOrWeek(e.target.value);
      // setValues({ ...values, isRepeated: true, repeatType: "customized", personalRepeatType: e.target.value, });
    };

    const chooseNumber=(e)=>{
    setNumberTimes(e.target.value)      
    }

    useEffect(()=>{
    chooseDays.includes(clickDay)?
    setChooseDays(chooseDays.filter((day)=>day!==clickDay)):
    setChooseDays([...chooseDays, clickDay]);
    console.log(chooseDays)
  },
    [isClicked])

    setHeader(' תדירות מותאמת אישית')

    const days = [{value: "א", day:"1"}, {value: "ב", day: "2"}, {value:"ג", day:"3"},
    {value: "ד", day: "4"}, {value: "ה", day:"5" }, {value:"ו", day:"6" }, {value:"ש", day: "7"}];

return(
    <div className={styles.container}>
    <div>חזרה כל</div>
    <input type="number" min="2" max="30" onInput={chooseNumber}/>
    <span><select onChange={chooseBack}>
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
          <span> <DateInput values={repeatSettingsEnd} setValues={setRepeatSettingsEnd} /></span>
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
        <input type="number" onInput={(e)=>setRepeatSettingsEnd(e.target.value)}min="2" max="30"/>
        <span>חזרות</span>
       </div>
       
      </div>
    </div>

          <div className={styles.buttons}>
          <ClassicButton
          text="סיים"
          width="30%"/>

          <ClassicButton
          text="ביטול"
          width="30%"/>
        </div>
  </div>

)
}
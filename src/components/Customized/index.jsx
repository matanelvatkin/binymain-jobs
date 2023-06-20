import styles from "./style.module.css";
import { useState, useContext } from 'react';
import headerContext from '../../context/headerContext';
import Input from "../Input";
import DateInput from "../DateInput";
import SelectIcon from '../SelectIcon';
import ClassicButton from "../ClassicButton copy";


function handleBack(e){
  console.log(e.target.value)
}

export default function Customized({values,setValues = () => { },...props}) {
    const { setHeader } = useContext(headerContext)
    const [endRepeat, setEndRepeat] = useState({});
    const [choose, setChoose]= useState()

    const chooseBack = (e) => {
      setChoose(e.target.value);
    };

    setHeader(' תדירות מותאמת אישית')

    const days = [
      { name: "א" },
      { name: "ב" },
      { name: "ג" },
      { name: "ד" },
      { name: "ה" },
      { name: "ו" },
      { name: "ש" },
    ];

return(
    <div className={styles.container}>
    <div>חזרה כל</div>
    <input type="number" min="2" max="30"/>
    <span><select onChange={chooseBack}>
<option value="weeks">שבועות</option>
<option value="days">ימים</option>
    </select>
          </span>

{choose==="weeks"&&

          <div className={styles.days_div}>
        <SelectIcon
          array={days}
          text={days}
          inText={true}
          header={"חזרה בימים:"}
          name="days"
          values={values}
          setValues={setValues}
          Days={true}
        />
      </div> }

<div className={styles.endDate}>
        <div className={styles.endDateInputs}>
          <div className={styles.inDate}>
          <Input
            // onChange={chooseRadioClick}
            label="ב"
            type="radio"
            name="repeatEnd"
            value="endDate"
          />
          <span> <DateInput values={endRepeat} setValues={setEndRepeat} /></span>
          </div>

<div className={styles.number}>
          <Input
            // onChange={chooseRadioClick}
            label="בעוד מספר פעמים"
            type="radio"
            name="repeatEnd"
            value="endNumber"
          />
           <Input 
          //  onChange={onChange}
            placeholder="בעוד מספר פעמים" type="text" name="repeatNumber" />
          </div>

      </div>
          </div>
          <ClassicButton
          text="סיים"
          width="30%"/>
          
          </div>

)
}
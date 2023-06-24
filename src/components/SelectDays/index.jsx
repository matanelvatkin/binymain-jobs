import { useState } from "react"
import styles from "./style.module.css";



export default function({days, setClickDay, isClicked, setIsClicked}){

    const [chooseStyle, setChooseStyle]=useState(styles.days)

function handleClickDay(days){
    setClickDay(days)
    chooseStyle==styles.days? setChooseStyle(styles.chooseDay):
    setChooseStyle(styles.days)
    setIsClicked(!isClicked)

}

return(
    <div className={chooseStyle} onClick={()=>handleClickDay(days.day)}>{days.value}'</div>
)


}
import { useState } from "react"
import styles from "./style.module.css";



export default function({days, setClickDay}){


return(
    <div className={styles.days} onClick={()=>setClickDay(days.value)}>{days.value}</div>
)


}
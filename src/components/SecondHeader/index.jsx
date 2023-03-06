import React from 'react'
import styles from "./style.module.css"
import {BsArrowRight} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function SecondHeader({text , ...props}) {
    const navigate = useNavigate()
    
    return (
    <div className={styles.secondHeader}>
        <div className={styles.text}>{text}</div>
        <BsArrowRight className={styles.arrowBack} onClick={() => navigate("/home")}/>
    </div>
      
  )
}

export default SecondHeader
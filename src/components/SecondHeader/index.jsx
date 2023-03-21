import React, { useContext } from 'react'
import styles from "./style.module.css"
import {BsArrowRight} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import headerContext from '../../context/headerContext'

function SecondHeader({text , ...props}) {
    
    const navigate = useNavigate()
    const {setHeader}= useContext(headerContext)

    const handleNavigate = () => {
      const currentLocation = window.location.pathname;
      if(currentLocation === '/registeretion'){
        navigate('/login')
      }else{
        navigate("/")
      }
    }


    return (
    <div className={styles.secondHeader}>
        <div className={styles.text}>{text}</div>
        <BsArrowRight className={styles.arrowBack} onClick={handleNavigate}/>
    </div>
      
  )
}

export default SecondHeader
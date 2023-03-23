import React from 'react'
import styles from "./style.module.css";
import {FiSearch} from 'react-icons/fi'
import {TbListSearch} from 'react-icons/tb'
import {BiAnalyse} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

function HeaderHome() {
  const navigate = useNavigate()
  return (
    <div className={styles.headerHome_container}>
      <div className={styles.titleContainer}>
         <h1 className={styles.title}> HereEvent </h1>
         <BiAnalyse className={styles.logo}/>
      </div>
      <div className={styles.options}>
        <span className={styles.iconContainer}><FiSearch className={styles.icon}/></span>
        <span className={styles.iconContainer} onClick={() =>{navigate("/searchEvent")}}> <TbListSearch className={styles.icon}/></span>   
      </div >
    </div>
  )
}

export default HeaderHome
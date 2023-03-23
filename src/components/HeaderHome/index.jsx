import React from 'react'
import styles from "./style.module.css";
import {FiSearch} from 'react-icons/fi'
import {CgPlayListSearch} from 'react-icons/cg'
import Logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

function HeaderHome() {
  const navigate = useNavigate()
  return (
    <div className={styles.headerHome_container}>
      <div className={styles.title}>
         <img src={Logo} alt="logo" />
      </div>
      <div className={styles.options}>
        <span>..אירועים באיזור שלך | <FiSearch className={styles.icon}/></span>
        <span onClick={() =>{navigate("/searchEvent")}}>  חיפוש מתקדם | <CgPlayListSearch className={styles.icon}/></span>   
      </div >
    </div>
  )
}

export default HeaderHome
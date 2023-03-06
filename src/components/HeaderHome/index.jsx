import React from 'react'
import styles from "./style.module.css";
import {FiSearch} from 'react-icons/fi'
import {CgPlayListSearch} from 'react-icons/cg'

function HeaderHome() {
  return (
    <div className={styles.headerHome_container}>
      <div className={styles.title}>
         <h1> HereEvent </h1>
      </div>
      <div className={styles.options}>
        <span>..אירועים באיזור שלך | <FiSearch className={styles.icon}/></span>
        <span>  חיפוש מתקדם | <CgPlayListSearch className={styles.icon}/></span>   
      </div >
    </div>
  )
}

export default HeaderHome
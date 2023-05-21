import React, { useContext } from 'react'
import styles from "./style.module.css";
import {BiAnalyse} from 'react-icons/bi'

function HeaderLogin() {

  return ( 
    <div className={styles.main}> 
        <div className={styles.header} >
           <h1 className={styles.title}> HereEvent </h1>
           <BiAnalyse className={styles.logo}/>
           </div>
           </div>
)}

export default HeaderLogin
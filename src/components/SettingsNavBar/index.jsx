import React from 'react'
import styles from './style.module.css'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbListSearch } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import { IoCreateOutline } from 'react-icons/io5'
import { BiHandicap } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function SettingsNavBar({ showSettings, setShowSettings, isValid, setIsValid }) {

  const navigate = useNavigate();

  // const navToLogin = () => {
  //   if (isValid===false) {
  //     navigate("/test");
  //   }
  // }

  // const logOut = () => {
  //   const confirmed = window.confirm('האם אתה בטוח שברצונך להתנתק ?');
  //   if (confirmed) {
  //     localStorage.removeItem('Token');
  //     setIsValid(false);
  //     console.log(isValid);
  //     setShowSettings(!showSettings);
  //     navToLogin();
  //   }
  // };


  return (
      <div
        className={styles.main}
        >

        <div className={styles.iconContainer}>
          <IoClose
            className={styles.icon}
            onClick={() => setShowSettings(!showSettings)}
          />
        </div>
        <span
          className={styles.category}
        >
          <CgProfile />
          פרופיל
        </span>
        <span className={styles.category} onClick={() => navigate('/searchEvent')}><TbListSearch />  חיפוש מתקדם</span>
        <span className={styles.category} onClick={() => navigate('/newEvent')}><IoCreateOutline />  פרסם אירוע</span>
        <span className={styles.category}><BiHandicap />  נגישות</span>
        <span className={styles.category} ><FiLogOut />  התנתק</span>
      </div>
  )
}

export default SettingsNavBar
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import popUpContext from '../../context/popUpContext';
import ClassicButton from '../ClassicButton copy';
import styles from "./style.module.css";

function  GuestPopup({text,guestMode}) {
  const {setPopUp} = useContext(popUpContext)
    const navigate = useNavigate();

    const navToRegistretionPage = () => {
      navigate("/registeretion");
      setPopUp(false)
    };
    const navToLoginPage = () => {
      navigate("/login");
      setPopUp(false)
    };

  return (
    <div className={styles.guestPopup_container}>
     <div className={styles.popup}>
        <p dir='rtl'>{text}</p>
        <div className={styles.buttons}>
        <ClassicButton
          width={'45%'}
          onClick={navToRegistretionPage}
          text={"הירשם עכשיו"}
        />
        {guestMode&&
        <ClassicButton
          width={'45%'}
          onClick={navToRegistretionPage}
          text={"המשך כאורח"}
        />
        }

        </div>
          <p dir='rtl'>יש לך מנוי?<u onClick={navToLoginPage}>לחץ כאן</u></p>
        
    </div>   
        
    </div>
  )
}

export default  GuestPopup
import React from 'react'
import styles from './style.module.css'
import {useState} from 'react'
import { IoClose } from 'react-icons/io5'
import {TbListSearch} from 'react-icons/tb'
import {CgProfile} from 'react-icons/cg'
import {IoCreateOutline} from 'react-icons/io5'
import {BiHandicap} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function SettingsNavBar() {

  const[ visibility, setVisibility ] = useState(true);
  const navigate = useNavigate();

  const logOut = () => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך להתנתק ?');
    if (confirmed) {
      localStorage.removeItem('Token');
      navigate('/login');
      setVisibility(false);
    } else {
      navigate('/');
    }
  };


  return (
    visibility?
    <div 
    className={styles.main}
    visibility={visibility}
    setVisibility={setVisibility}> 

        <div className={styles.iconContainer}>
          <IoClose 
          className={styles.icon}
          onClick={()=> setVisibility(!visibility)}
          />
          </div>
        <span 
        className={styles.category}
        >
          <CgProfile/>
          פרופיל
        </span>
        <span className={styles.category} onClick={()=> navigate('/searchEvent')}><TbListSearch/>  חיפוש מתקדם</span>
        <span className={styles.category} onClick={()=> navigate('/newEvent')}><IoCreateOutline/>  פרסם אירוע</span>
        <span className={styles.category}><BiHandicap/>  נגישות</span>
        <span className={styles.category} onClick={logOut}><FiLogOut/>  התנתק</span>
    </div>:null
  )
}

export default SettingsNavBar
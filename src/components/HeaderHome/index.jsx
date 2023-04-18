import React, {useState, useEffect, useContext} from 'react'
import styles from "./style.module.css";
import {FiSearch} from 'react-icons/fi'
import {CgPlayListSearch} from 'react-icons/cg'
import Logo from '../../images/logo.png';
import {TbListSearch} from 'react-icons/tb'
import {BiAnalyse} from 'react-icons/bi'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import headerContext from '../../context/headerContext';
import SettingsNavBar from '../SettingsNavBar';

function HeaderHome() {
  const navigate = useNavigate()
  const [headerHeight, setHeaderHeight] = useState(18)
  const{ search , setSearch } = useContext(headerContext);
  const [showInput, setShowInput] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  //     if (scrollTop > 0 && headerHeight === 18) {
  //       setHeaderHeight(16)
  //     } else if (scrollTop === 0 && headerHeight === 16) {
  //       setHeaderHeight(18)
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [headerHeight])

  return ( 
  <div className={styles.main} style={{ height: `${headerHeight}vh` }}> 
     <div className={styles.headerHome_container} >
      <div className={styles.titleContainer}>
        <div className={styles.titleBox}>
         <h1 className={styles.title}> HereEvent </h1>
         <BiAnalyse className={styles.logo}/>
         </div >
         <span className={styles.searchContainer}>
          <input 
          dir='rtl' 
          placeholder='חפש...' 
          className={showInput? styles.visibleInput : styles.hiddenInput} 
          type="search" 
          defaultValue={search} 
          onChange={(e)=>{setSearch(e.target.value);console.log(e);}}
          onClick={()=> setShowInput(true)}/>
        </span>
      </div>
      <div className={styles.options}>
        <span>
         <BsThreeDotsVertical className={styles.icon} onClick={() => setShowSettings(!showSettings)}/>
        </span>
        <span 
        className={styles.advanceContainer} onClick={() =>{navigate("/searchEvent")}}> <TbListSearch className={styles.icon}/>
        </span> 
        <span>
        <FiSearch className={styles.icon} onClick={()=> setShowInput(!showInput)}/>
        </span>
        </div >  
        </div>
        {showSettings && <SettingsNavBar visibility={true} setVisibility={setShowSettings}/>}
        </div>

  )
}

export default HeaderHome
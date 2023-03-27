import React, {useState, useEffect, useContext} from 'react'
import styles from "./style.module.css";
import {FiSearch} from 'react-icons/fi'
import {TbListSearch} from 'react-icons/tb'
import {BiAnalyse} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import headerContext from '../../context/headerContext';

function HeaderHome() {
  const navigate = useNavigate()
  const [headerHeight, setHeaderHeight] = useState(14)
  const{ search , setSearch } = useContext(headerContext)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTop > 0 && headerHeight === 14) {
        setHeaderHeight(10)
      } else if (scrollTop === 0 && headerHeight === 10) {
        setHeaderHeight(14)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headerHeight])

  return (
    <div className={styles.headerHome_container} style={{ height: `${headerHeight}vh` }}>
      <div className={styles.titleContainer}>
         <h1 className={styles.title}> HereEvent </h1>
         <BiAnalyse className={styles.logo}/>
      </div>
      <div className={styles.options}>
        <span className={styles.iconContainer}>
        <FiSearch className={styles.icon}/>
          <input dir='rtl' placeholder='חפש...' className={styles.input} type="search" defaultValue={search} onChange={(e)=>setSearch(e.target.value)}/>
        </span>
        <span 
        className={styles.iconContainer} onClick={() =>{navigate("/searchEvent")}}> <TbListSearch className={styles.icon}/>
        </span>   
      </div >
    </div>
  )
}

export default HeaderHome
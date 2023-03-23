import React, { useContext } from 'react'
import styles from "./style.module.css"
import { BsArrowRight } from 'react-icons/bs'
import headerContext from '../../context/headerContext'
import BackArrow from "../../components/BackArrow"

function SecondHeader({ text, ...props }) {

  const { setHeader } = useContext(headerContext)


  return (
    <div className={styles.secondHeader}>
      <div className={styles.text}>{text}</div>
      <div><BackArrow /></div>
    </div>

  )
}

export default SecondHeader
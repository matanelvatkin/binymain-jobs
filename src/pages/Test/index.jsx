import React from 'react'
import styles from './style.module.css'
import SelectIcon from '../../components/SelectIcon'

const categories = ["כיף", "מוסיקה", "יצירה", "אוכל", "הופעות", "טיולים",]
function Test() {
    
  return (
    <div className={styles.main}>
        Test
        <SelectIcon array={categories} />
    </div>
  )
}

export default Test
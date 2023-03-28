import React from 'react'
import styles from './style.module.css'
import SelectIcon from '../../components/SelectIcon'
import { GiLightBackpack } from 'react-icons/gi'
import RoundButton from '../../components/RoundButton'

const categories=[
  {icon: 'https://cdn-icons-png.flaticon.com/512/2564/2564884.png',
  name: 'כיף'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
  name: 'אוכל'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/751/751429.png',
  name: 'יצירה'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/2302/2302146.png',
  name: 'הופעות'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/4444/4444504.png',
  name: 'טיולים'},
] 
function Test() {

  return (
    <div className={styles.main}>
      <SelectIcon array={categories} header={'קטגוריה'} />
    </div>
  )
}

export default Test
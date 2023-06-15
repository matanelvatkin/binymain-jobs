import React, { useState } from 'react'
import styles from './style.module.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import headerContext from '../../context/headerContext'
import Input from '../../components/Input'
import ClassicButton from '../../components/ClassicButton copy'
import { IoIosCreate } from 'react-icons/io'
import axios from 'axios'
import { error } from 'jquery'
import apiCalls from '../../function/apiCalls'

function Registeretion() {
  const { setHeader } = useContext(headerContext)
  setHeader('דף הרשמה')

  const [userData, setUserData] = useState({})

  const navigate = useNavigate();

  const navToLoginPage = () => {
    navigate("/login");
  };


  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: `🙍🏽‍♂️ שם מלא`,
      maxLength: "22",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "🗝️ הגדר סיסמא",
      maxLength: "14",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "🗝️ אמת סיסמא",
      maxLength: "14",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: '📧 כתובת אימייל',
      required: true,
    },
  ];

  const createUser = async (e) => {
    e.preventDefault();
    const name = userData.fullName.trim();
  const words = name.split(' ');

  // Filter out words with less than 2 letters
  const filteredWords = words.filter(word => word.length >= 2);

  if (filteredWords.length >= 2) {
    if (userData.password === userData.confirmPassword) {
      const { confirmPassword, ...data } = userData;
      const updatedData = {
        ...data,
        userType: "regular"
      };
      console.log(updatedData);

      try {
        const res = await apiCalls("post", "user/creatUser", updatedData)
        if (!res.newUser.error) {
          navigate('/login')
        } else {
          alert(res.newUser.error);
        }
      }
      catch (error) {
        alert(error)
      };
    } else {
      alert('ססמאות לא תואמות')
  }
 } 
  else {
    alert('יש להזין לפחות שני מילים בעלות לפחות 2 אותיות לכל מילה');
  }
  };



  const handleKeyDown = (e) => {
    const allowedKeys = /^[a-zA-Z ]$/;
    if (e.target.name === 'fullName' && !allowedKeys.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };


  const handleChange = (e) => {
    if (e.target.name === 'fullName') {
      const name = e.target.value;
      const filteredName = name.replace(/[^a-zA-Z ]/g, '');
      setUserData({ ...userData, [e.target.name]: filteredName });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };


  return (
    <div className={styles.main}>

      <form className={styles.formArea} onSubmit={createUser} autoComplete="off">

        <div className={styles.header}><span> נעים מאוד :)</span><span>  נשמח להכיר אותך, כמה פרטים חשובים ונמשיך</span></div>
        <div className={styles.container}>
          {inputs.map((input) => {
            return (
              <div className={styles.feild}>
                <Input
                  key={input.id}
                  {...input}
                  width={'90%'}
                  className={styles.inputs}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  maxLength={input.maxLength}
                />
              </div>
            )
          })}
        </div>
        <div className={styles.create}>
          <ClassicButton
            width={'86%'}
            height={'100%'}
            type={'submit'}
          >
            <IoIosCreate className={styles.icon} /> צור משתמש
          </ClassicButton>
        </div>

      </form>
      <div className={styles.register}>
         <div> יש לך כבר חשבון?<span onClick={navToLoginPage} className={styles.clickHere}>לחץ כאן</span></div>
         </div>
    </div>
  )
}

export default Registeretion
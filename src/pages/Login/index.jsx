import React, { useContext, useRef, useEffect, useState } from 'react'
import headerContext from '../../context/headerContext';
import styles from "./style.module.css";
import Input from '../../components/Input'
import ToggleSwitch from '../../components/ToggleSwitch';
import ClassicButton from '../../components/ClassicButton copy';
import { FaSignInAlt } from 'react-icons/fa'
import { FiUserPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// creator: Yisrael Olonoff
// login page

function Login() {
  const { setHeader } = useContext(headerContext)
  setHeader('home')
  
  const [checked, setChecked] = useState(true);
  const [userInfo, setUserInfo] = useState({})

  const navigate = useNavigate();

  const navToRegistretionPage = () => {
    navigate("/registeretion");
  };

  const navToHome = () => {
    navigate("/");
  };

  const loginAouth = (e) => {
    e.preventDefault();
            axios
            .get('http://localhost:5000/api/user/findUser')
            .then((res) => {
              console.log(res);
                if(res.status===200) {
                  navToHome()
            }})
  }

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const handleToggleSwitch = (e) => {
    setChecked(e.target.checked);
  }

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: `🙍🏽‍♂️ שם פרטי + שם משפחה`,
      required: true,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "📱 הטלפון שלך",
      required: true,
    },
  ];


  return (
    <div className={styles.main}>
      <div className={styles.container}>
      <h2>התחברות</h2>
      <form className={styles.form} onSubmit={loginAouth}>
        {inputs.map((input) => {
          if (input.type !== "select")
            return (

              <Input
                key={input.id}
                {...input}
                width={'300px'}
                className={styles.inputs}
                onChange={handleChange}
              />
            )
        })}

        <ToggleSwitch
          text={'זכור אותי'}
          checked={checked}
          onChange={handleToggleSwitch}
        />

        <div className={styles.firstButton}>
          <ClassicButton
            width={'70%'}
            type={'submit'}
          >
            <FaSignInAlt className={styles.icon} /> התחברות
          </ClassicButton>
        </div>
      </form>

      <div className={styles.secondButtonContainer}>
        <div className={styles.secondButton}>
        <ClassicButton
          width={'70%'}
          onClick={navToRegistretionPage}
        >
          <FiUserPlus className={styles.icon} /> הרשמה
        </ClassicButton>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login
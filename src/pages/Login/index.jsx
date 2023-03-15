import React, { useContext , useRef ,useEffect} from 'react'
import headerContext from '../../context/headerContext';
import styles from "./style.module.css";
import Input from '../../components/Input'
import ToggleSwitch from '../../components/ToggleSwitch';
import ClassicButton from '../../components/ClassicButton copy';
import {FaSignInAlt} from 'react-icons/fa'
import {FiUserPlus} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// creator: Yisrael Olonoff
// login page

function Login() {
    const {setHeader} = useContext(headerContext)

    const fullNameInput = useRef()
    const phoneNumberInput = useRef()

    const navigate = useNavigate();

    const navToRegistretionPage = () => {
      navigate("/registeretion");
    };

    const navToHome = () => {
      navigate("/");
    };

    const loginAouth = (e) => {
        e.preventDefault();
        console.log(fullNameInput.current.value);
        // useEffect(() => {
        //         axios.get('http://localhost:5000/api/users', users).then((res) => {
        //             if(res.status===200) {
        //         console.log();
        //         }})
        // }, [])
    }


    const inputs = [
        {
          id: 1,
          name: "fullName",
          type: "text",
          placeholder: `🙍🏽‍♂️ שם פרטי + שם משפחה`,
          required: true,
          inputRef: fullNameInput,
        },
        {
          id: 2,
          name: "phoneNumber",
          type: "text",
          placeholder: "📱 הטלפון שלך",
          required: true,
          inputRef: phoneNumberInput,
        },
    ];


  return (
    <div className={styles.main}>
        <h2>התחברות</h2>
        <form className={styles.form} onSubmit={loginAouth}>
        {inputs.map((input) => {
          if (input.type !== "select")
            return (
              <Input
                key={input.id}
                {...input}
                className={styles.inputs}
              />
            )
            })}
            <ToggleSwitch text={'זכור אותי'}/>
            <div className={styles.firstButton}>
            <ClassicButton
            width={'80%'}
            type={'submit'}
            >
                <FaSignInAlt className={styles.icon}/> התחברות   
            </ClassicButton>
            </div>
            </form>
            <div className={styles.secondButton}>
            <ClassicButton
            width={'50%'}
            onClick={navToRegistretionPage}
            >
                <FiUserPlus className={styles.icon}/> הרשמה
            </ClassicButton>
            </div>
    </div>
  )
}

export default Login
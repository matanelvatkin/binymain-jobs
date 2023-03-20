import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import headerContext from '../../context/headerContext'
import Input from '../../components/Input'
import ClassicButton from '../../components/ClassicButton copy'
import {IoIosCreate} from 'react-icons/io'
import axios from 'axios'

function Registeretion() {
    const {setHeader} = useContext(headerContext)
    setHeader('דף הרשמה')

    const [userData, setUserData] = useState({})


    const navigate = useNavigate();

    const navToHome= () => {
      navigate("/");
    };
    

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
        {
          id: 3,
          name: "email",
          type: "email",
          placeholder: '📧 כתובת אימייל',
          required: true,
        },
    ];

    const createUser = (e) => {
        e.preventDefault();
          console.log(userData);
          axios
      .post("http://localhost:5000/api/user/creatUser", userData)
      .then(() => {
       console.log('user saved succesfuly!');
       navigate('/login')      
      });
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

  return (
    <div className={styles.main}>
        <form className={styles.formArea} onSubmit={createUser}>
        {inputs.map((input) => {
            return (
              <Input
                key={input.id}
                {...input}
                type={'text'}
                width={'300px'}
                className={styles.inputs}
                onChange={handleChange}
              />
            )
            })}
            <ClassicButton
            width={'70%'}
            type={'submit'}
            >
               <IoIosCreate className={styles.icon}/> צור משתמש
            </ClassicButton>
            </form>
    </div>
  )
}

export default Registeretion
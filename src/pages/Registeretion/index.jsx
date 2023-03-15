import React, { useRef } from 'react'
import styles from './style.module.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import headerContext from '../../context/headerContext'
import Input from '../../components/Input'
import ClassicButton from '../../components/ClassicButton copy'
import {IoIosCreate} from 'react-icons/io'

function Registeretion() {
    const {setHeader} = useContext(headerContext)
    setHeader('דף הרשמה')

    const fullNameInput = useRef()
    const phoneNumberInput = useRef()
    const emailInput = useRef()

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
        {
          id: 3,
          name: "email",
          type: "email",
          placeholder: '📧 כתובת אימייל',
          required: true,
          inputRef: emailInput,
        },
    ];

    const createUser = (e) => {
        e.preventDefault();
        console.log(fullNameInput.current.value, phoneNumberInput.current.value, emailInput.current.value);

        const newUserData = {
            fullName: fullNameInput.current.value,
            phoneNumber: phoneNumberInput.current.value,
            email: emailInput.current.value,
          };
          console.log(newUserData);
    }

  return (
    <div className={styles.main}>
        <form className={styles.formArea} onSubmit={createUser}>
        {inputs.map((input) => {
            return (
              <Input
                key={input.id}
                {...input}
                className={styles.inputs}
                inputRef={inputs.inputRef}
              />
            )
            })}
            <ClassicButton
            width={'60%'}
            type={'submit'}
            >
               <IoIosCreate className={styles.icon}/> צור משתמש
            </ClassicButton>
            </form>
    </div>
  )
}

export default Registeretion
import React, { useContext, useState } from 'react'
import headerContext from '../../context/headerContext';
import styles from "./style.module.css";
import Input from '../../components/Input'
import ToggleSwitch from '../../components/ToggleSwitch';
import ClassicButton from '../../components/ClassicButton copy';
import apiCalls from '../../function/apiCalls';
import { FaSignInAlt } from 'react-icons/fa'
import { FiUserPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../function/token'
import userContext from '../../context/userContext';

// creator: Yisrael Olonoff
// login page

function Login({ setIsValid, isValid }) {
  const { setUser } = useContext(userContext);
  const { setHeader } = useContext(headerContext)
  setHeader('home')

  const [checked, setChecked] = useState(true);
  const [userInfo, setUserInfo] = useState({})

  const navigate = useNavigate();

  const navToRegistretionPage = () => {
    navigate("/registeretion");
  };

  const navToForgetPassword = () => {
    navigate('/forgetPassword');
  };

  const loginAouth = (e) => {
    e.preventDefault();
    apiCalls(
      "post",
      "user/login",
      { email: userInfo.email, password: userInfo.password, }
    ).then((res) => {
      if (res.status === 200) {
        setUser(res.data.user)
        setToken(res.data.token)
        localStorage.setItem('Token', res.data.token)
        setIsValid(true)
        console.log('token set');
        console.log(`isValid state is set to: ${isValid}`);
        navigate("/");
      }
    })
      .catch((err) => {
        console.log(err);
        alert('אימייל/סיסמא לא נכונים')
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleToggleSwitch = (e) => {
    setChecked(!checked);
    console.log(checked);
  }

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: '📧 אימייל',
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "🗝️ סיסמא",
      required: true,
    },
  ];


  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>התחברות</h2>
        <form className={styles.form} onSubmit={loginAouth} >
          {inputs.map((input) => {
            return (
              <Input
                autoComplete='off'
                key={input.id}
                {...input}
                width={'300px'}
                className={styles.inputs}
                onChange={handleChange}
              />
            )
          })}
          <div className={styles.switchAndForgot}>
            <span
              className={styles.forgotPassword}
              onClick={navToForgetPassword}
            >
              שכחתי סיסמא
            </span>
            <ToggleSwitch
              text={'זכור אותי'}
              checked={checked}
              onChange={handleToggleSwitch}
            />
          </div>

          <div className={styles.firstButton}>
            <ClassicButton
              width={'70%'}
              type={'submit'}
              onClick={loginAouth}
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
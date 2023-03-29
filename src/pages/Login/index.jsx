import React, { useContext, useState } from 'react'
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
    axios.post("http://localhost:5000/api/user/login", {
      email: userInfo.email,
      password: userInfo.password,
    })
      .then((res) => {
        if (res.status === 200) {
          navToHome();
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('אימייל/סיסמא לא נכונים')
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (checked) {
      // If the toggle switch is on, save the value in local storage
      localStorage.setItem(name, value);
    } else {
      // If the toggle switch is off, retrieve the value from local storage
      const storedValue = localStorage.getItem(name);
      if (storedValue) {
        setUserInfo({ ...userInfo, [name]: storedValue });
        return;
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleToggleSwitch = (e) => {
    setChecked(e.target.checked);
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
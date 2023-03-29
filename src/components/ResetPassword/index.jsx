import React from 'react'
import { useLocation } from 'react-router-dom';
import apiCalls from '../../function/apiCalls';
import ClassicButton from '../ClassicButton copy'
import Input from '../Input'
import styles from "./style.module.css";

// creator: sapir 

function ResetPassword() {
    const location = useLocation();
  const handleReset = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.confirmNewPassword.value
    if(newPassword===confirmNewPassword){
       const email = location.state.email;
        apiCalls('post', '/user/resetPassword', { email, newPassword })
        .then(res=>console.log(res))
    }

}

  return (
      
      <div className={styles.main}>
            <div className={styles.container}>
                <h2>Reset password</h2>
                    <form className={styles.form} onSubmit={handleReset}>
                        <Input
                            placeholder={"הכנס סיסמא חדשה"}
                            width={'300px'}
                            name={'newPassword'}
                        />
                            <Input
                            placeholder={"אשר סיסמא חדשה"}
                            width={'300px'}
                            name={'confirmNewPassword'}
                        />
                        <div className={styles.firstButton}>
                            <ClassicButton
                                text={"אפס סיסמא"}
                                width={'70%'}
                            />
                        </div>
                    </form>
             
            </div>
        </div>
    
  )
}

export default ResetPassword
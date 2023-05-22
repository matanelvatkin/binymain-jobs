import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import apiCalls from '../../function/apiCalls';
import ClassicButton from '../ClassicButton copy'
import Input from '../Input'
import styles from "./style.module.css";

// creator: sapir 

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        const newPassword = e.target.newPassword.value;
        const confirmNewPassword = e.target.confirmNewPassword.value
        if (newPassword === confirmNewPassword) {
            const email = location.state.email;
            apiCalls('post', '/user/resetPassword', { email, newPassword })
            .then( res =>{
                if(res){
                    console.log(res);
                    setPasswordChanged(true)
                }
            } 
            )
        }
    }
    const cencelPopup = () => {
        setPasswordChanged(false);
        navigate('/login');
    };

    const handleInnerDivClick = (event) => {
        event.stopPropagation(); // Prevent event bubbling to the outer div
    };

    return (

        <div className={styles.main}>
            <div className={styles.container}>
                <h2>Reset password</h2>
                {!passwordChanged?
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
                :
                <div onClick={()=>setPasswordChanged(false)} className={styles.popupContainer}>
                        <div className={styles.popup} onClick={(e) => handleInnerDivClick(e)}>
                            <p>סיסמך שונתה בהצלחה</p>
                            <ClassicButton
                            text={"אישור"}
                            width={'70%'}
                            func = {cencelPopup}
                        />                        
                        </div>

                    </div>
} 

            </div>
        </div>

    )
}

export default ResetPassword
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiCalls from '../../function/apiCalls';
import styles from "./style.module.css";

function ForgetPassword() {
    const [codeToReset, setCodeToReset] = useState();
    const [resetPassword, setResetPassword] = useState(false)
    const navigate = useNavigate();

    const handleSendToEmail = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const code = Math.floor(Math.random() * 9000 + 1000);
        apiCalls('post', 5000, '/user/resetPass', { email, code });
        setCodeToReset(code);
    }

    const verifyCode = (e) => {
        e.preventDefault();
        if (codeToReset==e.target.code.value) {
            // navigate
            console.log("good");
        }
        else{
            console.log("no");
        }

    }

    return (

        <div className={styles.auth_container}>
            <div className={styles.auth_form}>
                <h2>forgot password</h2>
                {!codeToReset ?
                    <form onSubmit={handleSendToEmail}>
                        <div className={styles.form_control}>
                            <label htmlFor="email">Email</label>
                            <input
                                name='email'
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <button className={styles.button}>Send</button>
                    </form>
                    :
                    <div>
                        <form onSubmit={verifyCode} >
                            <div className={styles.form_control}>
                                <p>We will send you a password reset code to your email</p>
                                <input
                                    name='code'
                                    placeholder="Enter your code"
                                />
                            </div>
                            <button className={styles.button}>enter</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgetPassword
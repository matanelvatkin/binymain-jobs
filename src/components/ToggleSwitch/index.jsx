import React from 'react'
import styles from './style.module.css'


// creator: Yisrael Olonoff 
// a toggle switch button thet takes text as a props
// example: <ToggleSwitch text={'type here...'}/>
function ToggleSwitch({text}) {
    return (
        <div className={styles.main}>
            <p className={styles.text}>{text}</p>
            <label className={styles.switch}>
                <input type="checkbox"/>
                    <span className={styles.slider}> </span>
            </label>
        </div>
    )
}

export default ToggleSwitch
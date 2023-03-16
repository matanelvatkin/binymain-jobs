import React from 'react'
import styles from './style.module.css'


// creator: Yisrael Olonoff 
// a toggle switch button thet takes text as a props
// example: <ToggleSwitch text={'type here...'}/>
function ToggleSwitch({ text, checked, onChange, ...props }) {
    return (
        <div className={styles.main}>
            <p className={styles.text}>{text}</p>
            <label className={styles.switch}>
                <input 
                type="checkbox"
                checked={checked}
                onChange={onChange}
                {...props}
                />
                    <span className={styles.slider}> </span>
            </label>
        </div>
    )
}

export default ToggleSwitch
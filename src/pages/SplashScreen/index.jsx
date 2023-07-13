import React from 'react'
import styles from "./style.module.css"

function SplashScreen() {
    return (
        <div className={styles.main}>
            <img src={"/Frame 33508.svg"} alt="" className={styles.logo} />
            <span className={styles.textContainer}>
                <p className={styles.welcom}>
                    ברוכים הבאים ל Here Event!
                </p>
                <p className={styles.text}>
                    אפליקציית האירועים וההופעות של בנימין
                </p>
                <br />
                <p className={styles.text}>
                    כאן תוכלו לחפש למצוא ולהירשם לכל אירוע
                    שקורה ברחבי בנימין,{<br/>}
                    ואפילו לפרסם אירועים משלכם!
                </p>
            </span>
        </div>
    )
}

export default SplashScreen
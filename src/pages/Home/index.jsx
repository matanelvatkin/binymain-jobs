import React from 'react'
import styles from './style.module.css'
import ClassicButton from '../../components/ClassicButton copy'
import EventCard from '../../components/EventCard'
import Header from '../../layout/Header'


// Creator: Yisrael_Olonoff
// i created the home page using the "Header", "EventCard",
// and the "ClassicButton" components.
// the button position is fixed to the same excect position
// on the page.


function Home() {
    return (
        <div className={styles.main}>
            <Header />
            <p>
                Up Coming Events
            </p>
            <EventCard />
            <div className={styles.button}>
                <ClassicButton
                    width={"200px"}
                    text={'Publish Event'}
                />
            </div>
        </div>
    )
}

export default Home
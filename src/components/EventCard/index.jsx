import React from 'react'
import styles from './style.module.css'
import { BiShekel } from 'react-icons/bi'
import { ImLocation2 } from 'react-icons/im'

// creator: Yisrael Olonoff
// i created a card that will contain only necessary
// information of an event and show it according to the 
// Figma design. 
// i inculded fake data in the form of an array of objects
// where every object is a card, this will change once we 
// have real data to work with.


function EventCard() {
    const card = [
        {
            src: 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
            date: '01/03/2023',
            time: '19:30-23:00',
            title: 'פסטיבל צילום',
            price: '39.90',
            location: 'בניין החברה לפיתוח'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&usqp=CAU',
            date: '13/04/2023',
            time: '17:30-21:00',
            title: 'מנטור - יעוץ עסקי',
            price: '29.90',
            location: 'עופרה'
        },
    ]

    return (
        <>
            {card.map((v) => {
                return (
                    <div className={styles.main}>

                        <img
                            className={styles.img}
                            src={v.src}
                            alt='Event pic'
                        />

                        <div className={styles.infoBar}>
                            <div className={styles.first}>
                                <div className={styles.timeAndDate}>
                                    <span>
                                        {v.date}
                                    </span>
                                    <span>
                                        {v.time}
                                    </span>
                                </div>

                                <h4
                                    className={styles.title}
                                >
                                    {v.title}
                                </h4>
                            </div>

                            <div className={styles.second}>
                                <div className={styles.paragraphs}>
                                    <BiShekel />
                                    <p>{v.price}</p>
                                </div>

                                <div className={styles.paragraphs}>
                                    <ImLocation2 />
                                    <p>{v.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default EventCard
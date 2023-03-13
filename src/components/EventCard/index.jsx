import React, { useState, useEffect, useContext } from 'react'
import styles from './style.module.css'
import { BiShekel } from 'react-icons/bi'
import { ImLocation2 } from 'react-icons/im'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import headerContext from '../../context/headerContext'

// creator: Yisrael Olonoff
// i created a card that will contain only necessary
// information of an event and show it according to the 
// Figma design. 
// i inculded fake data in the form of an array of objects
// where every object is a card, this will change once we 
// have real data to work with.


function EventCard() {

    // eventName: "",
    // summary: "",
    // advertiser: "",
    // tel: "",
    // email: "",
    // date: "",
    // beginningTime: "",
    // finishTime: "",
    // place: "",
    // category: "",
    // targetAudience: "",
    // registrationPageUrl: "",
    // cardImageUrl: "",
    // coverImageUrl: "",
    // gallery: "",
    // type: "",
    // payment: "",

    const [card, setCard] = useState([
        {
            cardImageUrl: 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
            date: '01/03/2023',
            beginningTime: '19:30',
            finishTime: '23:00',
            eventName: 'פסטיבל צילום',
            payment: '39.90',
            place: 'בניין החברה לפיתוח'
        },
        {
            cardImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&usqp=CAU',
            date: '13/04/2023',
            beginningTime: '17:30',
            finishTime: '21:00',
            eventName: 'מנטור - יעוץ עסקי',
            payment: '29.90',
            place: 'עופרה'
        },
    ]);

    useEffect(()=>{
        axios.get('http://localhost:2000/event').then((event) => {
            setCard(event.data);
        })
    }, [])

    const { setHeader } = useContext(headerContext);

    const navigate = useNavigate();

    const navToViewEvent = () => {
      navigate("/viewEvent/:event");
    };

    return (
        <>
            {card.map((v) => {
                return (
                    <div 
                    className={styles.main}
                    onDoubleClick={() => {
                        navToViewEvent();
                        setHeader("פרטי אירוע");
                      }}
                    >

                        <img
                            className={styles.img}
                            src={v.cardImageUrl}
                            alt='Event pic'
                        />

                        <div className={styles.infoBar}>
                            <div className={styles.first}>
                                <div className={styles.timeAndDate}>
                                    <span>
                                        {v.date}
                                    </span>
                                    <span>
                                        {v.beginningTime}-
                                        {v.finishTime}
                                    </span>
                                </div>

                                <h4
                                    className={styles.eventName}
                                >
                                    {v.eventName}
                                </h4>
                            </div>

                            <div className={styles.second}>
                                <div className={styles.paragraphs}>
                                    <BiShekel />
                                    <p>{v.payment}</p>
                                </div>

                                <div className={styles.paragraphs}>
                                    <ImLocation2 />
                                    <p>{v.place}</p>
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
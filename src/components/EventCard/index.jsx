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


function EventCard({ events }) {

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

    const [card, setCard] = useState(events ? events : []);

    useEffect(() => {
        if(!events) {
            axios.get('http://localhost:5000/api/event').then((event) => {
            setCard(event.data);
            console.log(event.data);
            })
        }
    }, [])

    const { setHeader } = useContext(headerContext);

    const navigate = useNavigate();

    const navToViewEvent = (eventID) => {
        navigate('/viewEvent/:' + eventID);
    };


    return (
        <>
            {card.map((v) => {
                return (
                    <div
                        className={styles.main}
                        key={v._id}
                        onDoubleClick={() => {
                            navToViewEvent(v._id);
                        }}
                    >

                        <div className={styles.imgFrame}>
                            <img
                                className={styles.img}
                                src={v.cardImageURL||v.coverImageURL}
                                alt='Event pic'
                            />
                        </div>

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
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import RoundButton from "../../components/RoundButton";
import ClassicButton from "../../components/ClassicButton copy";
import headerContext from "../../context/headerContext";
import { AiFillCalendar } from "react-icons/ai";
import { MdOutlinePlace } from "react-icons/md";
import { TbTicket } from "react-icons/tb";
import apiCalls from "../../function/apiCalls";
import translation from "./translation.js";
import { useNavigatenpm } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import FavouriteMark from "../../components/FavouriteMark";

// Creator: Naama Orlan
//This page view the details of a specific event.

export default function ViewEvent() {
  const { setHeader } = useContext(headerContext);
  setHeader("פרטי האירוע");

  // In the routing there is a param called event which contains the event id.
  // I collect the eventID from the event param and then I call the server to give me the whole event's data.

  const { event } = useParams();

  //Two states. One for the data itself, the other is for the loading.

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState();
  const [datesOfEvents, setDatesOfEvents] = useState([]);

  async function fetchEvent() {
    let apiData = await apiCalls("get", "/event/" + event);
    setEventData(apiData);
    setDatesOfEvents(apiData.date)
  }

  useEffect(() => {
    fetchEvent();

  }, []);

  useEffect(() => {
    if (eventData) {
      setLoading(() => false);
      console.log(eventData);
    }
  }, [eventData]);

  // function getDateStatus(date) {
  //   const currentDate = new Date();
  //   const eventDate = new Date(date);

  //   if (eventDate < currentDate) {
  //     return "past";
  //   } else if (eventDate.getDate() === currentDate.getDate() &&
  //     eventDate.getMonth() === currentDate.getMonth() &&
  //     eventDate.getFullYear() === currentDate.getFullYear()) {
  //     return "present";
  //   } else {
  //     return "future";
  //   }
  // }

  return (
    <div className={style.container}>
      <div>
        {!loading ? (
          <img
            src={eventData.coverImageURL}
            className={style.coverImage}
            alt="cover-img"
          />
        ) : (
          <p>loading...</p>
        )}
      
      </div>
      <div className={style.content}>
        <div className={style.section}>
       
          {!loading ? (
            <h1 className={style.heading}>{eventData.eventName}</h1>
          ) : (
            <p>loading...</p>
          )}
           <div className={style.favourite}>
          <FavouriteMark />
        </div>
        </div>
<div className={style.main}>
        <div className={style.section}>
          {!loading ? (
            <div className={style.dataSection}>
              <div className={style.reactIcon}>
                <FaRegCalendarAlt />
              </div>
              <div className={style.dates}>
                {eventData.date.map((date, index) => {
                  const formattedDate = new Date(date).toLocaleDateString("he-IL", {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    timeZone: 'UTC',
                    numberingSystem: 'latn'
                  });
                  const dateObj = {
                    formattedDate,
                    weekday: formattedDate.split(',')[0]
                  };
                  return (
                    <div key={index} className={style.date}>
                      { eventData.isReapeated ? (
                      `${formattedDate} (כל  ${dateObj.weekday})`
                      ) : (
                      formattedDate
                )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>

        <div className={style.section}>
          {!loading ? (
            <div className={style.dataSection}>
              <div className={style.reactIcon}>
                <AiOutlineClockCircle />
              </div>
              <div
                className={style.hourOfEvent}
              >
                 {eventData.finishTime}- {eventData.beginningTime}
              </div>
              </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
    

        <div className={style.section}>
          {!loading ? (
            <div className={style.dataSection}>
              <div className={style.reactIcon}>
                <MdOutlinePlace />
              </div>
              
              <div className={style.placeOfEvent}> {eventData.place}</div>
              </div>
            
          ) : (
            <p>loading...</p>
          )}
        </div>

        <div className={style.section}>
          {!loading ? (
            <div className={style.dataSection}>
              <div className={style.reactIcon}>
                <BiMoney />
              </div>
              <div className={style.payment}> כניסה חופשית</div>
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
        </div>

        <div className={style.section}>
          {!loading ? (
            <div>
              <p className={style.detailsTitle}>{translation.details}</p>
              <p className={style.detailsContent}> {eventData.summary}</p>{" "}
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
        <div className={style.section}>
        <ClassicButton width={200} text={translation.cards}>
          <TbTicket className={style.ticketIcon}/>
        </ClassicButton>
        </div>
      </div>
    </div>
  );
}

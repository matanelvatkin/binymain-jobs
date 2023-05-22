import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import headerContext from "../../context/headerContext";
import { MdOutlinePlace } from "react-icons/md";
import { TbTicket } from "react-icons/tb";
import apiCalls from "../../function/apiCalls";
import translation from "./translation.js";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import FavouriteMark from "../../components/FavouriteMark";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";

// Creator: Naama Orlan
//This page view the details of a specific event.

export default function ViewEvent() {


  const audienceMapping = {
    "64118b289057ecc057ef8a38": "נשים",
    "64118b289057ecc057ef8a39": "משפחות",
    "64118b289057ecc057ef8a3a": "מבוגרים",
    "64118b289057ecc057ef8a3b": "נוער",
    "64118b289057ecc057ef8a3c": "ילדים"
  };

  const categoryMapping = {
    "641189cf3d762f6a181064c7": "כיף",
    "641189cf3d762f6a181064c8": "הרצאות",
    "641189cf3d762f6a181064c9": "אוכל",
    "641189cf3d762f6a181064ca": "יצירה מקומית",
    "641189cf3d762f6a181064cb": "מוזיקה"
  };

  const {user} = useContext(userContext);
  const {isAdmin, setIsAdmin} = useContext(userContext);
  const { setHeader } = useContext(headerContext);
  setHeader("פרטי האירוע");

  // In the routing there is a param called event which contains the event id.
  // I collect the eventID from the event param and then I call the server to give me the whole event's data.

  const { event } = useParams();

  //Two states. One for the data itself, the other is for the loading.

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isPublished, setIsPublished] = useState(false);


  async function fetchEvent() {
    let apiData = await apiCalls("get", "/event/" + event);
    if (user.userType === "admin") {
      setIsAdmin(true)
    }
    if (apiData.status === "published") {
      setIsPublished(true)
      setIsActive(true)
    }
    setEventData(apiData);
  }


  useEffect(() => {
    fetchEvent();
  },[user.userType, setIsAdmin]);

  useEffect(() => {
    if (eventData) {
      setLoading(() => false);
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


  const handleButtonToggle = () => {
    if (!isPublished) {
      setIsActive(!isActive);
      if (!isActive) {
        handlePublish();
      }
    }
  };  

  
  const handlePublish = async () => {
    try {
      const updatedData = await apiCalls("put", `/event/${event}`, { status: "published" });
      console.log(updatedData);
      setIsPublished(true);
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className={style.payment}>
          {eventData.payment.isFree === true? "כניסה חופשית" : "בתשלום" }
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
                <BsPeopleFill />
              </div>
              <div className={style.payment}>
              {eventData.audiences.map((audience, index) => (
          <span key={index}>
            {audienceMapping[audience]}
            {index !== eventData.audiences.length - 1 && ", "}
          </span>
        ))}
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
                <BiCategory />
              </div>
              <div className={style.payment}>
              {eventData.categories.map((category, index) => (
          <span key={index}>
            {categoryMapping[category]}
            {index !== eventData.categories.length - 1 && ", "}
          </span>
        ))}               
        </div>
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
        {eventData && eventData.registrationPageURL && (
        <div className={style.section}>
        <Link to={eventData.registrationPageURL} className={style.link}>
        <ClassicButton 
        width={200} 
        text={translation.cards}
        >        
          <TbTicket className={style.ticketIcon}/>
        </ClassicButton>
        </Link>
        </div>
        )}
        {isAdmin &&
        <div className={style.adminContainer}>
        <button 
        className={`${style.adminPublish ? (isActive ? style.active : style.adminPublish): style.active}`}
        onClick={handleButtonToggle}
        disabled={isPublished || isActive}
        >
          {isActive ? 'פורסם בהצלחה 👍🏽' : 'פרסם'}
        </button>
        </div>}
      </div>
    </div>
  );
}

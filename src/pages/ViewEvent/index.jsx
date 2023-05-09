import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import RoundButton from "../../components/RoundButton";
import ClassicButton from "../../components/ClassicButton copy";
import headerContext from "../../context/headerContext";
import { AiFillCalendar } from "react-icons/ai";
import { MdOutlinePlace } from "react-icons/md";
import apiCalls from "../../function/apiCalls";
import translation from "./translation.js";
import { useNavigatenpm } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { BiMoney } from "react-icons/bi";
import BackArrow from "../../components/BackArrow";
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

  async function fetchEvent() {
    let apiData = await apiCalls("get", "/event/" + event);
    setEventData(apiData);
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
        <div className={style.favourite}>
          <FavouriteMark />
        </div>
        <div className={style.backArrow}>
          {" "}
          <BackArrow color={"black"} />
        </div>
      </div>
      <div className={style.content}>
        <div className={style.section}>
          {!loading ? (
            <h1 className={style.heading}>{eventData.eventName}</h1>
          ) : (
            <p>loading...</p>
          )}
        </div>

        <div className={style.section}>
          {!loading ? (
            <div className={style.dataSection}>
              <div className={style.reactIcon}>
                <FaRegCalendarAlt />
              </div>
              <div className={style.dateOfEvent}>
                {" "}
                {eventData.date[0].slice(0, 10)}
              </div>
              <br />
              <div
                style={{ marginRight: "15px" }}
                className={style.hourOfEvent}
              >
                {eventData.beginningTime} - {eventData.finishTime}
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
              <div className={style.placeOfEvent}> כניסה חופשית</div>
            </div>
          ) : (
            <p>loading...</p>
          )}
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
        <ClassicButton width={200} text={translation.cards} />
      </div>
    </div>
  );
}

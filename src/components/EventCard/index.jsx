import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import { BiShekel } from "react-icons/bi";
import { ImLocation2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import apiCalls from "../../function/apiCalls";
import { event } from "jquery";

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
    if (!events) {
      apiCalls("post", "event")
        .then((event) => {
          setCard(event);
        });
    }
  }, []);

  // const eventDate = event.date.slice(0, -10);
  // console.log(eventDate);

  const { search } = useContext(headerContext);

  const navigate = useNavigate();

  const navToViewEvent = (eventID) => {
    navigate("/viewEvent/" + eventID);
  };

  return (
    <>
      {card
        .filter((v) =>
          v.eventName?.toLowerCase().includes(search.toLowerCase()) ||
          v.place?.toLowerCase().includes(search.toLowerCase())
        )
        .map((v) => {
          const date = new Date(v.date[0]);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <div
              className={styles.main}
              key={v._id}
              onClick={() => {
                navToViewEvent(v._id);
              }}
            >
              <div className={styles.imgFrame}>
                <img
                  className={styles.img}
                  src={v.cardImageURL || v.coverImageURL}
                  alt="Event pic"
                />
              </div>

              <div className={styles.infoBar}>
                <div className={styles.first}>
                <h3 className={styles.eventName}>{v.eventName}</h3>
                  <div className={styles.paragraphs}>
                    <ImLocation2 />
                    <p>{v.place}</p>
                  </div>
                  <div className={styles.timeAndDate}>
                    <span>{formattedDate}</span>
                    <span>
                      {v.beginningTime}-{v.finishTime}
                    </span>
                    
                  </div>
                </div>

               
                  {/* <div className={styles.paragraphs}>
                    <BiShekel />
                    <p>{v.payment}</p>
                  </div> */}

                  
                </div>
              </div>
          );
        })}
    </>
  );
}

export default EventCard;
import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import { BiShekel } from "react-icons/bi";
import { ImLocation2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ClassicButton from '../ClassicButton copy'
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

  const pageSize = 10

  const [card, setCard] = useState(events ? events : []);
  const [nextPage, setNextPage] = useState(1)

  const { search } = useContext(headerContext);

  // useEffect(() => {
  //   if (!events) {
  //     fetchEvents();
  //   }
  // }, []);
  
  const loadMore = () => {
    console.log("click");
    fetchEvents();
  }
  
    useEffect(() => {
      if (!events) {
        fetchEventsSearch();
      }
    }, [search]);

  const fetchEvents = () => {
    apiCalls("post", "event", {page: nextPage, pageSize : pageSize , search : search}).then((data) => {
       setCard((currentCard) => currentCard.concat(data.event))
      setNextPage(data.nextPage)
    });
  }

  const fetchEventsSearch = () => {
    apiCalls("post", "event", {page: 1, pageSize : pageSize , search : search}).then((data) => {
       setCard((data.event))
      setNextPage(data.nextPage)
    });
  }
  


  const navigate = useNavigate();

  const navToViewEvent = (eventID) => {
    navigate("/viewEvent/" + eventID);
  };
  
  // .filter(
  //   (v) =>
  //   v.eventName?.toLowerCase().includes(search.toLowerCase()) ||
  //     v.place?.toLowerCase().includes(search.toLowerCase()) 
  // )
  return (
    <>
      {card.map((v) => {
          const date = new Date(v.date[0]);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
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
        
        {nextPage?<ClassicButton 
        onClick={loadMore} 
        text={"Load..."}
        width={"100px"}
        />:null}
    </>
  );
}

export default EventCard;

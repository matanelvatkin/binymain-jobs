import styles from "./style.module.css";
import { ImLocation2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ClassicButton from '../ClassicButton copy'


// creator: Yisrael Olonoff
// i created a card that will contain only necessary
// information of an event and show it according to the
// Figma design.
// i inculded fake data in the form of an array of objects
// where every object is a card, this will change once we
// have real data to work with.

function EventCard({ events, nextPage , loadMore }) {

  const navigate = useNavigate();

  const navToViewEvent = (eventID) => {
    navigate("/viewEvent/" + eventID);
  };
  
  return (
    <>
      {events?.map((v) =>{ 
          const date = new Date(v.date[0]);
          console.log(date)
          const formattedDate = date.toLocaleDateString("he-IL",
           {
            weekday: 'long',
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
                  <div className={styles.date}>
                    <div className={styles.date}>{formattedDate}</div>
                  </div>
                  <div className={styles.time}>
                      {v.beginningTime}
                    </div>
                  <div className={styles.location}>
                    <ImLocation2 />
                    <p>{v.place}</p>
                  </div>
                </div>
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
        )}

export default EventCard;

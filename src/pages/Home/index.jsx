import React, {  useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import EventCard from "../../components/EventCard";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import userContext from "../../context/userContext";
import popUpContext from "../../context/popUpContext";
import apiCalls from "../../function/apiCalls";

// Creator: Yisrael_Olonoff
// i created the home page using the "Header", "EventCard",
// and the "ClassicButton" components.
// the button position is fixed to the same exsect position
// on the page.
// pageSize= how many events in loading

function Home() {
  
  
  const pageSize = 10

  const [events, setEvents] = useState([]);
  const [nextPage, setNextPage] = useState(1)

  
  const { search , setHeader } = useContext(headerContext);
  const { user, setUser } = useContext(userContext);
  const { setPopUp, setGuestMode, setPopUpText } = useContext(popUpContext);
  
  const navigate = useNavigate();

  useEffect(() => {fetchEventsSearch()}, [search]);
  
  const navToNewEvent = () => {
    // if(!user){
      setPopUp(true);
      setGuestMode(false);
      setPopUpText("כדי שתוכל לפרסם אירוע, נהיה חייבים להכיר😊");
      
      // }
      // else{
        navigate("/newEvent");
        // }
      };
      
  setHeader("home");

  const logOut = () => {
    const confirmed = window.confirm("האם אתה בטוח שברצונך להתנתק ?");
    if (confirmed) {
      localStorage.removeItem("Token");
      setUser(false);
      navigate("/login");
    }
  };

  const fetchEventsNext = () => {
    apiCalls("post", "event", {page: nextPage, pageSize : pageSize , search : search}).then((data) => {
      setEvents((currentEvent) => currentEvent.concat(data.event))
      setNextPage(data.nextPage)
    });
  }

  const fetchEventsSearch = () => {
    apiCalls("post", "event", {page: 1, pageSize : pageSize , search : search}).then((data) => {
      setEvents((data.event))
      setNextPage(data.nextPage)
    });
  }




  return (
    <div className={styles.main}>
      {/* <BiLogOutCircle className={styles.logOut} onClick={logOut} /> */}
      <div className={styles.eventsContainer}>
        <EventCard eventCards={events} nextPage={nextPage} loadMore={fetchEventsNext}/>
      </div>
      <div className={styles.button}>
        <ClassicButton
          width={"120px"}
          text={"פרסם אירוע"}
          onClick={() => {
            navToNewEvent();
          }}
        />
      </div>
    </div>
  );
}

export default Home;

import React, { createContext, useContext, useState } from "react";
import styles from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import EventCard from "../../components/EventCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import userContext from "../../context/userContext";
import GuestPopup from "../../components/GuestPopup";
import popUpContext from "../../context/popUpContext";
import apiCalls from "../../function/apiCalls";

// Creator: Yisrael_Olonoff
// i created the home page using the "Header", "EventCard",
// and the "ClassicButton" components.
// the button position is fixed to the same excect position
// on the page.

function Home() {
  const { setHeader } = useContext(headerContext);
  const {user} = useContext(userContext);
  const {setPopUp,setGuestMode,setPopUpText} = useContext(popUpContext)

  const navigate = useNavigate();
  const navToNewEvent = () => {
    if(!user){
        setPopUp(true)
        setGuestMode(false)
        setPopUpText('כדי שתוכל לפרסם אירוע, נהיה חייבים להכיר😊')

    }
    else{
      navigate("/newEvent");
    }
  };
  
  setHeader("home");

  return (
      <div className={styles.main}>
        <div className={styles.eventsContainer}>
          <EventCard />
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

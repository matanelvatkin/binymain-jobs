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
import {BiLogOutCircle} from 'react-icons/bi'


// Creator: Yisrael_Olonoff
// i created the home page using the "Header", "EventCard",
// and the "ClassicButton" components.
// the button position is fixed to the same excect position
// on the page.

function Home({isValid, setIsValid}) {
  const { setHeader } = useContext(headerContext);
  const {user, setUser} = useContext(userContext);
  const {setPopUp,setGuestMode,setPopUpText} = useContext(popUpContext)

  const navigate = useNavigate();
  
  const navToNewEvent = () => {
    // if(!user){
        setPopUp(true)
        setGuestMode(false)
        setPopUpText('כדי שתוכל לפרסם אירוע, נהיה חייבים להכיר😊')

    // }
    // else{
      navigate("/newEvent");
    // }
  };
  
  setHeader("home");

  const logOut = () => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך להתנתק ?');
    if (confirmed) {
      localStorage.removeItem('Token');
      setUser(false)
      navigate('/login')
    }
  };

  return (
      <div className={styles.main}>
          {/* <BiLogOutCircle className={styles.logOut} onClick={logOut}/> */}
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

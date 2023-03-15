import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import RoundButton from "../../components/RoundButton";
import ClassicButton from "../../components/ClassicButton copy";
import headerContext from "../../context/headerContext";
import { AiFillCalendar } from "react-icons/ai";
import apiCalls from "../../function/apiCalls";
import translation from "./translation.js";

// Creator: Naama Orlan
//This page view the details of a specific event.

export default function ViewEvent () {

    const { setHeader } = useContext(headerContext);
    setHeader("");

    // In the routing there is a param called event which contains the event id.
    // I collect the eventID from the event param and then I call the server to give me the whole event's data.

    const {event} = useParams();
    

    //Two states. One for the data itself, the other is for the loading.
    
    const [loading, setLoading] = useState(true);
    const [ eventData, setEventData ] = useState();
    
    async function fetchEvent () {
        let apiData = await apiCalls ('get', 2000, '/event/' + event);
        setEventData(apiData);        
    }

    useEffect(()=>{fetchEvent()}, []);
    
    useEffect(()=>{
        if(eventData){
            setLoading(()=>false);
            console.log(eventData);
        }
        
    }, [eventData]);

    return (
        <div className={style.content}>
        <div className={style.coverImage}>
            {
                !loading ? 
                <img src={eventData.coverImageURL} alt='cover-img'/> :
                <p>loading...</p>
            }
        </div>
        <div className={style.heading}>
            {
                !loading ? 
               <h1>{eventData.eventName}</h1>
                : <p>loading...</p>
            }
        </div>
        
        <div className={style.heading}>
            {
                !loading ? 
               <p>{eventData.date}<br/>{eventData.beginningTime} - {eventData.finishTime}</p> 
               : <p>loading...</p>
            }
        </div>

        <div className={style.heading}>
            {
                !loading ? 
               <p>{eventData.place}</p> 
               : <p>loading...</p>
            }
        </div>

        <div className={style.heading}>
            {
                !loading ? 
               <p>כניסה חופשית</p> 
               : <p>loading...</p>
            }
        </div>

        <div className={style.details}>
            {
                !loading ? 
                <div><p>{translation.details}</p><p> {eventData.summary}</p> </div>
               
               : <p>loading...</p>
            }
        </div>
        <ClassicButton width={100} text={translation.cards}/>           
        </div>
    );
    
}
import EventCard from "../../components/EventCard";
import { useState, useEffect, useContext } from "react";
import apiCalls from "../../function/apiCalls";
import style from "./style.module.css";
import headerContext from "../../context/headerContext";
import { translation } from "../SearchEvent/translation";

export default function SearchResult({search}) {
  console.log(search);

  const [searchMode, setSearchMode] = useState("loading")
  const [events, setEvents] = useState();

  const { setHeader } = useContext(headerContext);

  setHeader(translation.advencedSearch);

  async function fetchEvents() {
    let apiSingleEvents = await apiCalls("post", "/event/search", {
      page: 1,
      pageSize: 20,
      ...search
    });
    
    let apiEvents = apiSingleEvents.event
    setEvents(() => apiEvents);
    if(apiEvents.length===0)(setSearchMode("noResult"))
    else {setSearchMode("isResult")}
  }

  useEffect(() => {
    setSearchMode("loading")
    try {
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={style.container}>
      <EventCard events={events} searchMode={searchMode}/>
    </div>
  );
}
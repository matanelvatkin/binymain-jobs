import { useParams } from "react-router-dom";
import EventCard from "../../components/EventCard";
import { useState, useEffect, useContext } from "react";
import apiCalls from "../../function/apiCalls";
import Loader from "../../components/Loader";
import EmptySearch from "../../components/EmptySearch";
import InvalidQuery from "../../components/InvalidQuery";
import style from "./style.module.css";
import headerContext from "../../context/headerContext";
import { translation } from "../SearchEvent/translation";

export default function SearchResult({search}) {
  console.log(search);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidQuery, setIsInvalidQuery] = useState(false);
  const [events, setEvents] = useState();
  const { setHeader } = useContext(headerContext);

  setHeader(translation.advencedSearch);

  // let { query } = useParams();
//   let filter = JSON.parse(decodeURIComponent(query));
// console.log(filter,"filter");
  // console.log(filter);

  // let singleEventsFilter = {
  //   ...filter//,
   // $and: [...filter.$and, { date: { $not: { $type: "array" } } }],
  // };

  // let repetedEventsFilter = {
  //   ...filter,
  //   $and: [
  //     {
  //       date: {
  //         $elemMatch: { $gte: filter.$and[0].$gte, $lte: filter.$and[1].$lte },
  //       },
  //     },
  //     { date: { $type: "array" } },
  //   ],
  // };

  async function fetchEvents() {
    let apiSingleEvents = await apiCalls("post", "/event", {
      page: 1,
      pageSize: 10,
      search: search.location,
    });
    console.log(apiSingleEvents);
    // console.log(singleEventsFilter);
    // let apiReptedEvents = await apiCalls("post", "/event", repetedEventsFilter);
    // console.log(apiReptedEvents);
    let apiEvents = apiSingleEvents.event//.concat([apiReptedEvents.event]);
    console.log(apiEvents);
    setEvents(() => apiEvents);
  }

  useEffect(() => {
    try {
      fetchEvents();
    } catch (err) {
      console.log(err);
      setIsInvalidQuery(() => true);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(events)) setIsLoading(() => false);
  }, [events]);

  return (
    <div className={style.container}>
      <EventCard events={events} />
    </div>
  );
}

  // {!isInvalidQuery ? (
  //   isLoading ? (
  //     <Loader />
  //   ) : !events ? (
  //     <EmptySearch />
  //   ) : (
  //     <EventCard events={events} />
  //   )
  // ) : (
  //   <InvalidQuery />
  // )}
import { useParams } from "react-router-dom";
import EventCard from "../../components/EventCard";
import { useState, useEffect } from "react";
import apiCalls from "../../function/apiCalls";
import Loader from "../../components/Loader";
import EmptySearch from "../../components/EmptySearch";
import InvalidQuery from "../../components/InvalidQuery";
import style from "./style.module.css";

export default function SearchResult() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidQuery, setIsInvalidQuery] = useState(false);
  const [events, setEvents] = useState();

  let { query } = useParams();
  let filter = JSON.parse(decodeURIComponent(query));

  // console.log(filter);

  let singleEventsFilter = {
    ...filter,
    $and: [...filter.$and, { date: { $not: { $type: "array" } } }],
  };

  let repetedEventsFilter = {
    ...filter,
    $and: [
      {
        date: {
          $elemMatch: { $gte: filter.$and[0].$gte, $lte: filter.$and[1].$lte },
        },
      },
      { date: { $type: "array" } },
    ],
  };

  async function fetchEvents() {
    let apiSingleEvents = await apiCalls("post", "/event/search", {
      page: 1,
      pageSize: 10,
      ...search,
    });

    let apiEvents = apiSingleEvents.event;
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
      {!isInvalidQuery ? (
        isLoading ? (
          <Loader />
        ) : !events ? (
          <EmptySearch />
        ) : (
          <EventCard events={events} />
        )
      ) : (
        <InvalidQuery />
      )}
    </div>
  );
}

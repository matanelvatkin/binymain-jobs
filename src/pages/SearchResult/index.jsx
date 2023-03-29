import { useParams } from 'react-router-dom'
import EventCard from '../../components/EventCard'
import { useState, useEffect } from 'react'
import apiCalls from '../../function/apiCalls'
import Loader from '../../components/Loader'
import EmptySearch from '../../components/EmptySearch'
import InvalidQuery from '../../components/InvalidQuery'


export default function SearchResult() {
  
  const [isLoading, setIsLoading] = useState(true)
  const [isInvalidQuery, setIsInvalidQuery] = useState(false)
  const [events, setEvents] = useState()

  let { query } = useParams()
  let filter = JSON.parse(decodeURIComponent(query))

  console.log(filter);
  
  async function fetchEvents() {
    let apiEvents = await apiCalls('post', '/event', filter)
    setEvents(() => apiEvents)
  }

  useEffect(()=>{
    try {
      fetchEvents()
    }catch(err) {
      console.log(err);
      setIsInvalidQuery(() => true)
    }
  },[])

  useEffect(()=>{
    if(Array.isArray(events))
      setIsLoading(() => false) 
  },[events])

  return (
    <div>
      {
        !isInvalidQuery ?
          isLoading ? 
            <Loader /> :
            !events ? 
              <EmptySearch /> :
              <EventCard events={events} /> : 
          <InvalidQuery />
      }
    </div>
  )
}

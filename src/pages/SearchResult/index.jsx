import { useParams } from 'react-router-dom'
import EventCard from '../../components/EventCard'
import { useState, useEffect } from 'react'
import apiCalls from '../../function/apiCalls'


export default function SearchResult() {
  
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState()

  let { query } = useParams()
  let filter = JSON.parse(decodeURIComponent(query))

  async function fetchEvents() {
    let apiEvents = await apiCalls('get', 2000, '/event', filter)
    setEvents(() => apiEvents)
  }

  useEffect(()=>{fetchEvents()},[])

  useEffect(()=>{
    if(Array.isArray(events))
      setIsLoading(() => false) 
  },[events])

  return (
    <div>index</div>
  )
}

import React from 'react';
import styles from '../../../styles/styles';
import EventCard from './EventCard'
import { useSelector } from 'react-redux';


function Events() {
  const {allEvents,isLoading} = useSelector((state) => state.event);  
  return (
    <div>
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
          <div className="w-full-grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
      </div>
    </div>
  </div>
  )
}

export default Events

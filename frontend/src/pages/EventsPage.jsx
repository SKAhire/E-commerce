import React from 'react'
import Headers from '../components/layout/Headers'
import EventCard from '../components/Route/Events/EventCard'
import Footer from '../components/layout/Footer'

const EventsPage = () => {
  return (
    <div>
      <Headers activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
      <Footer />
    </div>
  )
}

export default EventsPage

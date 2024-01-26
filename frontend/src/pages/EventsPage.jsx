import React from "react";
import Headers from "../components/layout/Headers";
import EventCard from "../components/Route/Events/EventCard";
import Footer from "../components/layout/Footer";
import Loader from "../components/layout/Loader";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Headers activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;

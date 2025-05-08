import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W";

function EventPage() {
  const { events_id } = useParams();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${events_id}.json?apikey=${API_KEY}`
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Det skjedde en feil under fetch", error);
      }
    };

    getEvents();
  }, [events_id]);


  useEffect(() => {
    if (events) {
      console.log("Fetched event data:", events);
    }
  }, [events]);

  return <h1>{events?.name || "Laster inn..."}</h1>;
}

export default EventPage;

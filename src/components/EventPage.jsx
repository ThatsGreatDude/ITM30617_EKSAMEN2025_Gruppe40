import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W";

function EventPage() {
  const { events_id } = useParams();
  const [events, setEvents] = useState();

  const getEvents = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${events_id}.json?apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) =>
        console.error("det skjedde en feil under fecth", error)
      );
  };

  useEffect(() => {
    getEvents();
  }, [events_id]);

  return <h1>{events?.name}</h1>;
}

export default EventPage;

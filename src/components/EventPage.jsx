import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W";

function EventPage() {
  const { events_id } = useParams();
  const [event, setEvent] = useState();

  const getEvents = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${events_id}.json?apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) =>
        console.error("det skjedde en feil under fecth", error)
      );
  };

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

  return (
    <section>
      <h1>{event?.name}</h1>
      {event?.images && (
        <img src={event.images[0]?.url} alt={event.name} className="eventpage-image"/>
      )}
      <p>{event?.info || "Ingen informasjon er tilgjengelig."}</p>
      <p>Dato: {event?.dates?.start?.localDate}</p>
      <p>Sted: {event?._embedded?.venues?.[0]?.name}</p>
      <p>Kjøp Billetter →</p> 
    </section>
  );
}

export default EventPage;

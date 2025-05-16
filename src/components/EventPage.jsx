import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import ArtistCard from "./Artistcard";
import './EventPage.css';

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
    getEvents();
  }, [events_id]);

  const festivalPasses = event?.products?.filter(p => p.name.toLowerCase().includes("pass"));


  return (
    <section>
      <h1>{event?.name}</h1>
      {event?.images && (
        <img src={event.images[0]?.url} alt={event.name} className="eventpage-image"/>
      )}
      <p><strong>{event?.info || event?.description || "Ingen informasjon er til gjengelig."}</strong></p>
      <p><strong>Dato:</strong> {event?.dates?.start?.localDate}</p>
      <p><strong>Klokkeslett:</strong> {event?.dates?.start?.localTime || "Ikke oppgitt"}</p>
      <p><strong>Sted:</strong> {event?._embedded?.venues?.[0]?.city?.name || "Ikke oppgitt"}, {event?._embedded?.venues?.[0]?.country?.name || "Ikke oppgitt"}</p>
     
      {event?.classifications && (
      <p><strong>Sjanger:{" "}</strong>
      {event.classifications.map((c) => c.genre?.name)
      .filter((name) => name && name.toLowerCase() !== "undefined")
      .filter((name, index, self) => self.indexOf(name) === index) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
      .join(", ") || "Ikke oppgitt"}
      </p> )}

      {event?._embedded?.attractions?.length > 0 && (
      <>
        <h2>Artist</h2>
        <ArtistCard artist={event._embedded.attractions[0]} />
      </>
      )}

      <p><strong>Tilgjengelighet:</strong> {
          {onsale: "Billetter tilgjengelig"} [event?.dates?.status?.code] || "Ikke oppgitt"
        }
      </p>
      
      {event?.url && (
        <p>
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            Kjøp billetter →
          </a>
        </p>
      )}

      <h2>Festivalpass</h2>
      {festivalPasses && festivalPasses.length > 0 ? (
        festivalPasses.map((pass) => <EventCard key={pass.id} event={pass} />)
      ) : (
        <p>Ingen festivalpass tilgjengelig.</p>
      )}
    </section>
  );
}

export default EventPage;

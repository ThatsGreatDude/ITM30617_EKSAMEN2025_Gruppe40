import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";

import '../Styling/EventPage.css';

const API_KEY = "AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W";

const extractArtistsFromEvents = events => {
  const artistMap = new Map();

  events.forEach(event => {
    const attractions = event._embedded?.attractions || [];
    attractions.forEach(artist => {
      if (!artistMap.has(artist.id)) {
        artistMap.set(artist.id, {
          id: artist.id,
          name: artist.name,
          image: artist.images?.[0]?.url || null,
        });
      }
    });
  });

  return Array.from(artistMap.values());
};

function EventPage() {
  const { events_id } = useParams();
  const [event, setEvent] = useState();

  const getEvents = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${events_id}.json?apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) =>
        console.error("det skjedde en feil under fetch", error)
      );
  };

  useEffect(() => {
    getEvents();
  }, [events_id]);

  const artists = event ? extractArtistsFromEvents([event]) : [];
  const festivalPasses = event?.products?.filter(p => p.name.toLowerCase().includes("pass"));

  return (
    <section>
      <h1>{event?.name}</h1>
      {event?.images && (
        <img src={event.images[0]?.url} alt={event.name} className="eventpage-image"/>
      )}
      <p><strong>{event?.info || event?.description || "Ingen informasjon er tilgjengelig."}</strong></p>
      <p><strong>Dato:</strong> {event?.dates?.start?.localDate}</p>
      <p><strong>Klokkeslett:</strong> {event?.dates?.start?.localTime || "Ikke oppgitt"}</p>
      <p><strong>Sted:</strong> {event?._embedded?.venues?.[0]?.city?.name || "Ikke oppgitt"}, {event?._embedded?.venues?.[0]?.country?.name || "Ikke oppgitt"}</p>

      {event?.classifications && (
        <p><strong>Sjanger:{" "}</strong>
          {event.classifications.map((c) => c.genre?.name)
            .filter((name) => name && name.toLowerCase() !== "undefined")
            .filter((name, index, self) => self.indexOf(name) === index)
            .join(", ") || "Ikke oppgitt"}
        </p>
      )}

      {artists.length > 0 && (
        <>
          <h2>Artister</h2>
          <div className="artist-grid">
            {artists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </>
      )}

      <p><strong>Tilgjengelighet:</strong> {
        {onsale: "Billetter tilgjengelig"}[event?.dates?.status?.code] || "Ikke oppgitt"
      }</p>

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

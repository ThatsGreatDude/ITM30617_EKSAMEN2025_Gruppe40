import { Link } from "react-router-dom";


export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <h3>{event.name}</h3>
      <p>{event.info || "testestest"}</p>
      <span>{event.dates?.start.localDate}</span>
      <Link to={`/event/${event.id}`} className="event-card-link">
        Se detaljer
      </Link>
    </article>
  );
}


import { Link } from 'react-router-dom';

const EventCard = ({ events }) => {
  return (
    <div className="event-grid">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <img
            src={event.images[0]?.url}
            alt={event.name}
            className="event-card-img"
          />
          <h3 className="event-card-title">{event.name}</h3>
          <Link to={`/event/${event.id}`} className="event-card-link">
            Se detaljer →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventCard;

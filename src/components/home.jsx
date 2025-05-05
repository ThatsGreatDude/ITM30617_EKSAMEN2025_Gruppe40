import React, { useEffect, useState } from 'react';
import '../home.css';

 {/* Foreløpig kode for API - MAlene  */}

const API_KEY = 'AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W';
const proxyUrl = 'https://corsproxy.io/?';
const eventIds = [
  'Z698xZb_Z16v7eGkFy', // findings
  'Z698xZb_Z17q339',    // Neon
  'Z698xZb_Z17qfaA',    // Skeikampfestivalen
  'Z698xZb_Z17q3qg',    // Tons of rock 
];

function Home() {
  console.log("Home-komponenten kjører");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = [];
        for (const id of eventIds) {
          const apiUrl = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`;
          const response = await fetch(`${proxyUrl}${apiUrl}`);
          if (!response.ok) {
            throw new Error(`Feil ved henting av event ${id}: ${response.status}`);
          }
          const data = await response.json();
          fetchedEvents.push(data);
          await new Promise(res => setTimeout(res, 1000)); 
        }
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Feil ved henting av eventer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <h1>Utvalgte festivaler</h1>
      {loading ? (
        <p>Laster inn...</p>
      ) : events.length === 0 ? (
        <p>Ingen arrangementer funnet.</p>
      ) : (
        <div className="event-grid">
          {events.map(event => (
            <div
              key={event.id}
              className="event-card"
            >
              <img
                src={event.images[0]?.url}
                alt={event.name}
                className="event-card-img"
              />
              <h3 className="event-card-title">{event.name}</h3>
              <a
                href={`/event/${event.id}`}
                className="event-card-link"
              >
                Se detaljer →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

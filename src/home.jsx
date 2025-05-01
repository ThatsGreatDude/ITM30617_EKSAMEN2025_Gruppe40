import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const API_KEY = 'AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W';
const proxyUrl = 'https://corsproxy.io/?';
const eventIds = [
  'Z698xZb_Z16v7eGkFy', // Findings
  'Z698xZb_Z17q339',   // Neon
  'Z698xZb_Z17qfaA',   // Skeikampenfestivalen
  'Z698xZb_Z17q3qg'    // Tons of Rock
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
          const response = await axios.get(`${proxyUrl}${apiUrl}`);
          fetchedEvents.push(response.data);
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

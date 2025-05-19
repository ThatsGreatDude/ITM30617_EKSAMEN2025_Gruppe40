import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../home.css';
import EventCard from './EventCard';

const API_KEY = 'AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W';
const proxyUrl = 'https://corsproxy.io/?';
const eventIds = [
  'Z698xZb_Z16v7eGkFy', // Findings
  'Z698xZb_Z17q339',   // Neon
  'Z698xZb_Z17qfaA',   // Skeikampenfestivalen
  'Z698xZb_Z17q3qg'    // Tons of Rock
];

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = [];
        for (let id of eventIds) {
          const response = await fetch(`${proxyUrl}https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`);
          if (!response.ok) {
            throw new Error('Feil ved henting av data');
          }
          const data = await response.json();
          fetchedEvents.push(data);
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
        <EventCard events={events} />
      )}
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../home.css';
import ArtistCard from './ArtistCard';

const API_KEY = 'AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W';
const proxyUrl = 'https://corsproxy.io/?';
const eventIds = [
  'Z698xZb_Z16v7eGkFy', // Findings
  'Z698xZb_Z17q339',   // Neon
  'Z698xZb_Z17qfaA',   // Skeikampenfestivalen
  'Z698xZb_Z17q3qg'    // Tons of Rock
];
const cities = ['Berlin', 'London', 'Paris', 'Oslo'];

function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [cityEvents, setCityEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [city, setCity] = useState('Berlin');
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data._embedded?.events || [];
    } catch (error) {
      console.error('Feil ved henting av eventer:', error);
      return [];
    }
  };

  function extractArtistsFromEvents(events) {
    const artistMap = new Map();

    events.forEach((event) => {
      const attractions = event._embedded?.attractions || [];
      attractions.forEach((artist) => {
        if (!artistMap.has(artist.id)) {
          artistMap.set(artist.id, {
            id: artist.id,
            name: artist.name,
            description: artist.classifications?.[0]?.genre?.name || "Artist",
            released_date: event.dates?.start?.localDate || "",
          });
        }
      });
    });

    return Array.from(artistMap.values());
  }

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      setLoading(true);
      const fetchedEvents = await Promise.all(
        eventIds.map(id =>
          fetchEvents(`${proxyUrl}https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
        )
      );
      const flatEvents = fetchedEvents.flat();
      setFeaturedEvents(flatEvents);
      const eventArtists = extractArtistsFromEvents(flatEvents);
      setArtists(eventArtists);
      setLoading(false);
    };

    fetchFeaturedEvents();
  }, []);

  useEffect(() => {
    const fetchCityEvents = async () => {
      setLoading(true);
      const cityEventsData = await fetchEvents(`${proxyUrl}https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${API_KEY}&size=10`);
      setCityEvents(cityEventsData);
      setLoading(false);
    };

    fetchCityEvents();
  }, [city]);

  return (
    <div className="home-container">
      <h1>Utvalgte festivaler</h1>
      {loading ? (
        <p>Laster inn...</p>
      ) : featuredEvents.length === 0 ? (
        <p>Ingen arrangementer funnet.</p>
      ) : (
        <div className="event-grid">
          {featuredEvents.map((event) => (
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
      )}

      {/*Usikker på om vi trenger tittel her, men mer oversiktlig for nå*/}
      <h2>Artister fra utvalgte festivaler:</h2> 
      <div className="artist-grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      <h1 id="choose-city">Velg byen du ønsker å se</h1>
      <div className="city-buttons">
        {cities.map((cityName) => (
          <button key={cityName} onClick={() => setCity(cityName)}>
            {cityName}
          </button>
        ))}
      </div>

      <h2>I {city} kan du oppleve:</h2>

      {loading ? (
        <p>Laster inn...</p>
      ) : cityEvents.length === 0 ? (
        <p>Ingen arrangementer funnet i {city}.</p>
      ) : (
        <div className="event-grid">
          {cityEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.images[0]?.url}
                alt={event.name}
                className="event-card-img"
              />
              <h3 className="event-card-title">{event.name}</h3>
              <p>{event._embedded?.venues[0]?.city?.name}, {event._embedded?.venues[0]?.country?.name}</p>
              <p>{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

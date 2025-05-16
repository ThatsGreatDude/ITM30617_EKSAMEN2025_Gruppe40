import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../home.css';
import ArtistCard from './ArtistCard';

const API_KEY = 'AgNENsWPtsr9hDbDVE6OHkBjGeHHc20W';
const proxyUrl = 'https://corsproxy.io/?';
const eventIds = [
  'Z698xZb_Z16v7eGkFy',
  'Z698xZb_Z17q339',
  'Z698xZb_Z17qfaA',
  'Z698xZb_Z17q3qg'
];

const cities = ['Berlin', 'London', 'Paris', 'Oslo'];

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [city, setCity] = useState('Berlin');
  const [cityEvents, setCityEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingCity, setLoadingCity] = useState(true);

  const fetchEvents = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Feil ved henting av eventer:', error);
      return [];
    }
  };

  const extractArtistsFromEvents = events => {
    const artistMap = new Map();

    events.forEach(event => {
      const attractions = event._embedded?.attractions || [];
      attractions.forEach(artist => {
        if (!artistMap.has(artist.id)) {
          artistMap.set(artist.id, {
            id: artist.id,
            name: artist.name,
            description: artist.classifications?.[0]?.genre?.name ? artist.classifications[0].genre.name : "Artist",
            released_date: event.dates?.start?.localDate || "",
            image: artist.images?.[0]?.url || null,
          });
        }
      });
    });

    return Array.from(artistMap.values());
  };

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      setLoadingFeatured(true);
      const fetchedEvents = await Promise.all(
        eventIds.map(id =>
          fetchEvents(`${proxyUrl}https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
        )
      );
      const validEvents = fetchedEvents.filter(Boolean);
      setFeaturedEvents(validEvents);
      const eventArtists = extractArtistsFromEvents(validEvents);
      setArtists(eventArtists);
      setLoadingFeatured(false);
    };

    fetchFeaturedEvents();
  }, []);

  useEffect(() => {
    const fetchCityEvents = async city => {
      setLoadingCity(true);
      try {
        const response = await fetch(`${proxyUrl}https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${API_KEY}&size=10`);
        if (!response.ok) {
          throw new Error('Feil ved henting av data for by');
        }
        const data = await response.json();
        setCityEvents(data._embedded?.events || []);
      } catch (error) {
        console.error('Feil ved henting av eventer for by:', error);
        setCityEvents([]);
      } finally {
        setLoadingCity(false);
      }
    };

    fetchCityEvents(city);
  }, [city]);

  // Hjelpefunksjon for å hente første gyldige bilde
  const getEventImage = (event) => event.images?.find(img => img?.url)?.url;

  // Intern komponent for å vise eventkort
  const EventCardBlock = ({ event, showLink }) => (
    <div className="event-card">
      {getEventImage(event) && (
        <img
          src={getEventImage(event)}
          alt={event.name}
          className="event-card-img"
          loading="lazy"
        />
      )}
      <h3 className="event-card-title">{event.name}</h3>
      {event._embedded?.venues && (
        <p>{event._embedded.venues[0]?.city?.name}, {event._embedded.venues[0]?.country?.name}</p>
      )}
      {event.dates?.start?.localDate && (
        <p>{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
      )}
      {showLink && (
        <Link to={`/event/${event.id}`} className="event-card-link">
          Se detaljer →
        </Link>
      )}
    </div>
  );

  return (
    <div className="home-container">
      <h1>Utvalgte festivaler</h1>
      {loadingFeatured && <p>Laster inn...</p>}
      {!loadingFeatured && featuredEvents.length === 0 && <p>Ingen arrangementer funnet.</p>}
      {!loadingFeatured && featuredEvents.length > 0 && (
        <div className="event-grid">
          {featuredEvents.map(event => (
            <EventCardBlock key={event.id} event={event} showLink />
          ))}
        </div>
      )}

      <h2>Artister fra utvalgte festivaler:</h2> 
      <div className="artist-grid">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      <br></br>
      <h1 id='choose-city'>Velg byen du ønsker å se</h1>
      <div className="city-buttons">
        {cities.map(cityName => (
          <button key={cityName} onClick={() => setCity(cityName)}>
            {cityName}
          </button>
        ))}
      </div>

      <h2>I {city} kan du oppleve:</h2>

      {loadingCity && <p>Laster inn...</p>}
      {!loadingCity && cityEvents.length === 0 && <p>Ingen arrangementer funnet i {city}.</p>}
      {!loadingCity && cityEvents.length > 0 && (
        <div className="event-grid">
          {cityEvents.map(event => (
            <EventCardBlock key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const { events_id } = useParams();
const [events, setEvents] = useState();

const getEvents = async () => {
  fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => setEvents(data.data))
    .catch((error) =>
      console.error("det skjedde en feil under fecth", error)
    );
};

useEffect(() => {
  getEvents);
}, [events_id]);
return <h1>{events?.name}</h1>;
}
 

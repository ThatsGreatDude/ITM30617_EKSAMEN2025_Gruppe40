import { Link } from "react-router-dom";
import '../Styling/ArtistCard.css';
import '../Styling/EventPage.css';

export default function ArtistCard({ artist }) {
  const imageUrl = artist.image || "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="artist-card">
      <img src={imageUrl} alt={artist.name} />
      <h3>{artist.name}</h3>
      {artist.description && <p>{artist.description}</p>}
      {artist.released_date && <p>{artist.released_date}</p>}
    </div>
  );
}

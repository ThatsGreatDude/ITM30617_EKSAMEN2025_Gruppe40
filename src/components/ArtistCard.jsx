import { Link } from "react-router-dom";
import './ArtistCard.css';

export default function ArtistCard({ artist }) {
  const imageUrl = artist.image || "https://via.placeholder.com/250x150?text=Artist";

  return (
    <article className="ArtistCard">
      <img
        src={imageUrl}
        alt={artist.name}
        className="artist-image"
        loading="lazy"
      />
      <h3>{artist.name}</h3>
      {artist.description && <p>{artist.description}</p>}
      {artist.released_date && <span>{artist.released_date}</span>}
      <Link to={`/artist/${artist.id}`}>Gå til artist</Link>
    </article>
  );
}
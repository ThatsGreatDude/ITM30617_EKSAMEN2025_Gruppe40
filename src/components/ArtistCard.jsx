import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) {
  return (
    <article className="ArtistCard">
      <h3>{artist.name}</h3>
      {artist.description && <p>{artist.description}</p>}
      {artist.released_date && <span>{artist.released_date}</span>}
      <Link to={`/artist/${artist.id}`}>Gå til artist</Link>
    </article>
  );
}

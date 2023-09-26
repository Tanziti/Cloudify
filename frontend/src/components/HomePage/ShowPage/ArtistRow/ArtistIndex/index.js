import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function ArtistIndex({ artist }) {
  const history = useHistory();

  return (
    <ul onClick={() => { history.push(`/artists/${artist.id}`) }}>
      <li><img src={`${artist.imageUrl}`}></img></li>
      <li className="artistName">{artist.name}</li>
    </ul>
  )
}
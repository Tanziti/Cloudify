import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import './AlbumsIndexItem.css'

export default function AlbumsIndexItem({ album }) {
  const history = useHistory();

  return (
    <ul onClick={() => { history.push(`/albums/${album?.id}`) }}>
      <li><img src={album?.image} alt={album.title}></img></li>
      <li className="albumName">{album?.name}</li>
      <li className="albumYear">{album?.year} · Album</li>
    </ul>
  )
}
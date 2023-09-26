import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export default function AlbumsRowIndex({ album }) {
  const history = useHistory();
  return (
    <ul onClick={history.push(`/albums/${album.id}`)}>
      <li><img src={`${album.imageUrl}`}></img></li>
      <li className="artistName">{album.title}</li>
    </ul>
  )
}
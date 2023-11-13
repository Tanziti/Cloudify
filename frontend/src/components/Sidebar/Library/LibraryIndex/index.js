import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector } from "react-redux";


export default function LibraryIndex({ playlist, album }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {(playlist.userId === sessionUser.id ) && (
        <li onClick={() => {
          if (playlist) {
            history.push(`/playlists/${playlist.id}`)
          } 
        }}>
          <div className="albumImage">
            <div className="playlistImageStandin" style={{ backgroundColor: `${playlist.color}` }}></div>
            {/* <img src={ playlist ? playlist.imageUrl : album.imageUrl}></img> */}
          </div>
          <div className="albumInfo">
            <h3>{playlist ? playlist.title : album.title}</h3>
            <h4>{playlist ? "Playlist" : "Album"} · {playlist ? playlist.userName : album.artistName}</h4>
          </div>
        </li>
      )}
    </>
  )
}
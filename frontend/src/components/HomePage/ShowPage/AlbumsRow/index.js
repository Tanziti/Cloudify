import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import ArtistIndex from "./ArtistIndex"
import './AlbumsRow.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlbums, fetchAlbums } from "../../../../store/albums"
import AlbumsRowIndex from "./AlbumsRowIndex"


const AlbumsRow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const albums = useSelector(getAlbums);

  const sessionUser = useSelector(state => state.session.user);

  const topPadding = {
    paddingTop: `66px`,
  }

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [])

  const generateGreeting = (user) => {
    const today = new Date();
    const currentHour = today.getHours();
    if (currentHour < 12) {
      return user ? `Good morning, ${user.name}` : "Good morning"
    } else if (currentHour < 18) {
      return user ? `Good afternoon, ${user.name}` : "Good afternoon"
    } else {
      return user ? `Good evening, ${user.name}` : "Good evening"
    }
  }
  console.log(albums)
  return (

    <>
      {albums && (
        <>
          <h2 style={topPadding} id="albumGridHeader" class="artistGridHeader"><Link to="/home">Albums</Link></h2>
          <div className="artistGrid">
            {Object.values(albums).map(album => (
              <ul onClick={() => history.push(`/albums/${album.id}`)}>
                <li><img src={`${album.imageUrl}`} alt={album.title} /></li>
                <li className="artistName">{album.title}</li>
              </ul>
            ))}
          </div>
        </>
      )}
    </>
  )
}
export default AlbumsRow
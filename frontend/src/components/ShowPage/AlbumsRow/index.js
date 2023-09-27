import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import ArtistIndex from "./ArtistIndex"
import './AlbumsRow.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlbums, fetchAlbums } from "../../../store/albums"



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



  return (

    <>
      {albums && (
        <>
          <h2 style={topPadding} id="albumGridHeader" className="artistGridHeader"><Link to="/albums">Albums</Link></h2>
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
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"

import './ArtistRow.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchArtists, getArtists } from "../../../store/artists"



export default function ArtistRow() {

  const history = useHistory();
  const dispatch = useDispatch();
  const artists = useSelector(getArtists);

  console.log("artist")
  useEffect(() => {
    dispatch(fetchArtists());
  }, [])

  return (

    <>

      {artists && (
        <>
          <h2 style={{ paddingTop: `66px` }} className="artistGridHeader"><Link to="/artists">Artists</Link></h2>
          <div className="artistGrid">
            {
              Object.values(artists).map(artist => {
                return <ul onClick={() => { history.push(`/artists/${artist.id}`) }}>
                  <li id="artistGridImage"><img src={`${artist.imageUrl}`}></img></li>
                  <li className="artistName">{artist.name}</li>
                </ul>
              })
            }
          </div>
        </>
      )}
    </>
  )
}
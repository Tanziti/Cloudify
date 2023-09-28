import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
// import AlbumsIndex from './AlbumsIndex'
import './artist.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArtist, getArtist } from '../../../store/artists';
import { useEffect } from 'react';
import { getAlbum } from '../../../store/albums';
// import PopularSongItem from './PopularSongItem';


// export const formatTime = (seconds) => {
//   if (seconds && !isNaN(seconds)) {
//     return new Date(seconds * 1000)
//       .toISOString()
//       .slice(11, 19)
//       .replace(/^0(?:0:0?)?/, '');
//   } else if (seconds === 0) {
//     return '0:00';
//   } else {
//     return '-:--';
//   }
// }


export default function Artist() {

  const dispatch = useDispatch();
  const { artistId } = useParams();
  const artist = useSelector(getArtist(artistId));
  // const album = useSelector(getAlbum(artist?.albumId))
  debugger

  const sessionUser = useSelector(state => state.session.user);
  let currentSong = sessionUser?.queue?.[0]?.[0]
  useEffect(() => {
    currentSong = sessionUser?.queue?.[0]?.[0]
  }, [sessionUser])

  useEffect(() => {
    dispatch(fetchArtist(artistId));
    console.log("artist index dispatch entered")
  }, [dispatch, artistId])


  debugger
  let artistBannerStyle = {}
  const topPadding = {
    paddingTop: `88px`,
  }
  if (artist === null) {
    return;
  }
  if (artist?.imageUrl) {
    artistBannerStyle = {
      backgroundImage: `url(${artist.imageUrl})`
    }
  }
  return (
    <>
      <div className="artistBanner" style={artistBannerStyle} >
      </div>
      <div className='artistHeaders' style={topPadding}>
        <h5><i className="fa-solid fa-circle-check" color="#3D91F4"></i> Verified Artist</h5>
        <h1>{artist?.name}</h1>

        <h4>1,234,567,890 monthly listeners</h4>
      </div>
      <div className='opaqueBkgd'>
        <div className='popularSongs'>

          <span className="bigButtons">
            <button className="bigPlay"><i className="fa-solid fa-play"></i></button>
            <span className="bigHeart"><i className="fa-regular fa-heart"></i></span>
            <span className="bigDots"><i className="fa-solid fa-ellipsis"></i></span>
          </span>
          <h2>Popular</h2>
          <table>
            {/* {[1, 2, 3, 4, 5].map(i => {
              // return //<PopularSongItem i={i} songs={
                  Object.values(songs)
                      .sort((a,b) => b.plays - a.plays)
              } albums={albums}/>
            })} */}

          </table>
        </div>
        <div className='discog'>
          <h2>Discography</h2>
          {/* {artist.albums && (
                <div className="albumGrid">
                    {artist.albums.map(album => {
                        return <AlbumsIndexItem album={album} />
                    })}
                </div>
            )} */}
        </div>
      </div>

    </>
  )
}
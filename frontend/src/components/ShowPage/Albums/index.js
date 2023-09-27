import { Link, useParams } from "react-router-dom"
// import AlbumsIndex from "../ArtistShow/AlbumsIndex"
import './Albums.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum, getAlbum, getAlbums } from "../../../store/albums";
import { useEffect, useState } from "react";
import { getSongs } from "../../../store/songs";
import { getArtist } from "../../../store/artists";
import SongIndex, { invisibleEllipsisSymbol } from "./SongIndex";


export default function Albums() {
  const { albumId } = useParams();
  const album = useSelector(getAlbum(albumId))
  // const [album, setAlbum] = useState("")
  const dispatch = useDispatch();
  // console.log(albumId)


  // const sessionUser = useSelector(state => state.session.user);

  // let currentSong = sessionUser?.queue?.[0]?.[0]

  // useEffect(() => {
  //   currentSong = sessionUser?.queue?.[0]?.[0]
  // }, [sessionUser])

  // const songs = useSelector(getSongs);
  debugger
  // const albums = useSelector(getAlbums);


  // const moreAlbums = Object.values(albums).filter(album => album.id !== Number(albumId) && album.artistId === artist.id);
  useEffect(() => {

    debugger
    dispatch(fetchAlbum(albumId));
    // debugger
    console.log("function entered")
  }, [albumId]);

  // const album = useSelector(getAlbum(albumId));


  debugger
  if (album === null) {
    return <h1>first render</h1>;
  }
  debugger





  // debugger
  return (
    //   <div id="test">
    //     <>
    //       <div className="albumShowTop">
    //         <div className="albumImage">
    //           <img src={album.imageUrl}></img>
    //         </div>
    //         <div className='albumHeaders'>
    //           <h4>Album</h4>
    //           <h1>{album.title}</h1>

    //           <h5>
    //             <img src={artist.imageUrl}></img>
    //             <Link to={`/artists/${artist.id}`}>{artist.name}</Link>

    //           </h5>
    //         </div>
    //       </div>
    //       <div className='opaqueBkgd-2' style={{
    //         backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 1))`
    //       }}>
    //         <div className='trackList'>
    //           <span className="bigButtons">
    //             <button className="bigPlay" onClick={() => {
    //               // if (sessionUser) {
    //               //   sessionUser.queue = songsForQueue
    //               //   const audio = document.querySelector("audio")
    //               //   audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0
    //               //   if (audio.paused) {
    //               //     document.querySelector(".playPause").click()
    //               //   }
    //               // }
    //             }}>{currentSong?.albumId === albumId ?
    //               (<i className="fa-solid fa-pause"></i>) :
    //               (<i className="fa-solid fa-play"></i>)}</button>
    //             <span className="bigHeart"><i className="fa-regular fa-heart"></i></span>
    //             <span className="bigDots"><i className="fa-solid fa-ellipsis"></i></span>
    //           </span>

    //           <table>
    //             <tr>
    //               <td>#</td>
    //               <td>
    //                 Title
    //               </td>
    //               <td></td>
    //               <td><i className="fa-regular fa-clock"></i></td>
    //               {/* <td>{invisibleEllipsisSymbol()}</td> */}
    //             </tr>
    //             <hr></hr>
    //             {/* {songsForTracklist.map(song => {
    //               return (
    //                 <SongIndex
    //                   key={song.id}
    //                   song={song}
    //                   artist={artist}
    //                   songsForQueue={songsForQueue.filter(entry => entry[0].number >= song.number)} />
    //               )
    //             })} */}

    //           </table>
    //           {/*   <div className='moreBy'>
    //                 {moreAlbums.length > 0 && (
    //                   <>
    //                     <h2>More by {artist.name}</h2>
    //                     <AlbumsIndex albums={moreAlbums} /> 
    //                   </>
    //                 )}
    //               </div>*/}
    //         </div>
    //       </div>
    //     </>

    //     )
    //   </div>

    <>
      <h1>
        second render</h1></>
  )
}
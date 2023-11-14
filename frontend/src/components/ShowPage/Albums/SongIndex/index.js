import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { formatTime } from "../../Artist";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylists } from "../../../../store/playlists";
import { createPlaylistSong, deletePlaylistSong, fetchPlaylistSongs, getPlaylistSongs, receivePlaylistSongs } from "../../../../store/playlistSongs";




const playSymbol = () => {
  return <i className="fa-solid fa-play" style={{ color: "#FFFFFF" }}></i>;
}
const HeartSymbol = ({ liked, onClick }) => {
  const heartClass = liked ? "fa-solid fa-heart green" : "fa-regular fa-heart";

  return (
    <i className={heartClass} style={{ fontSize: "16px" }} onClick={onClick}></i>
  );
};
const pauseSymbol = () => {
  return <i className="fa-solid fa-pause" style={{ color: "#FFFFFF" }}></i>;
}
const spinningDiscSymbol = () => {
  return <i className="fa-solid fa-compact-disc fa-spin"></i>;
}
const ellipsisSymbol = () => {
  return <i className="fa-solid fa-ellipsis" style={{ color: "#FFFFFF" }}></i>;
}
export const invisibleEllipsisSymbol = () => {
  return <i className="fa-solid fa-ellipsis" style={{ opacity: 0 }}></i>;
}

export default function SongIndex({ song, artist, songsForQueue }) {
  const [numberPlay, setNumberPlay] = useState(song.number);
  const [heart, setHeart] = useState("");
  const [ellipsis, setEllipsis] = useState(invisibleEllipsisSymbol());
  const sessionUser = useSelector(state => state.session.user);
  const [greenText, setGreenText] = useState({ color: "#FFFFFF" });
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [hiddenUlHidden, setHiddenUlHidden] = useState(true);
  const playlists = useSelector(getPlaylists);
  const history = useHistory();
  const dispatch = useDispatch();

  
  const likedSongsPlaylist = Object.values(playlists)[0];
  debugger
  const [liked, setLiked] = useState(() => {
    debugger
    if (likedSongsPlaylist?.songIds?.length > 0) {
      return likedSongsPlaylist.songIds.some((playlistSong) => {
        debugger
        return playlistSong === song.id;
      });
    }
    return false; // default value when songIds array is not available or empty
  });

  const handleClick = () => {
    debugger
    if (!liked){
      setLiked(true)
      dispatch(createPlaylistSong({
        playlist_id: likedSongsPlaylist.id,
        song_id: song.id,
        // song_number: likedSongsPlaylist.songIds.length + 1  
      }))
    } 
    else {
      setLiked(false)
      dispatch(deletePlaylistSong())
    }
  };

  let currentSong = sessionUser?.queue?.[1]?.[0]
  console.log()

// useEffect(()=>{
//   dispatch(fetchPlaylistSongs())
// },[setLiked, dispatch])
// useEffect(()=>{
//   dispatch(fetchPlaylistSongs())
// },[])
 
  useEffect(() => {
    const audio = document.querySelector("audio");
    currentSong = sessionUser?.queue?.[1]?.[0]
    if (song.id === currentSong?.id) {
      setGreenText({ color: "#1ED760" })
    } else {
      setGreenText({ color: "#FFFFFF" })
    }
  }, [sessionUser?.queue?.[1]])

  useEffect(() => {
    if (!showOptionsMenu) return;

    // const closeOptionsMenu = () => {
    //     setShowOptionsMenu(false);
    // };
    // debugger
    // document.addEventListener('click', closeOptionsMenu);
    // return () => document.removeEventListener("click", closeOptionsMenu);
}, [showOptionsMenu]);

const optionsButtonClick = (e) => {
  debugger
 if (showOptionsMenu) return setShowOptionsMenu(false);
 return setShowOptionsMenu(true)
}

  const handleTrackClick = () => {
    if (sessionUser) {
      // debugger
        sessionUser.queue = [[song]];
        const audio = document.querySelector("audio");
        // debugger
        audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0;
      
      if (audio.paused) {
        document.querySelector(".playPause").click()
      }
    }
  }

  const displayNumberPlay = () => {
    if (song.id === currentSong?.id) {
      const audio = document.querySelector("audio");
      if (audio.paused) {
        return numberPlay;
      } else {
        return spinningDiscSymbol();
      }
    } else {
      return numberPlay;
    }
  }
 
  const hiddenUl = () => {
    return (
      <ul className="hiddenUl">
      { playlists && (
          <>
          { Object.values(playlists).map(playlist => {
             return  <>
             {(playlist.title !== "Liked Songs" ) && (playlist.userId === sessionUser.id) && (
               <li >
                 <div className="albumImage">
                  
                   {/* <img src={ playlist ? playlist.imageUrl : album.imageUrl}></img> */}
                 </div>
                 <div className="albumInfo">
                   <h3 id="add-button" onClick={()=>{
                debugger
                dispatch(createPlaylistSong({
                  "playlist_id": playlist.id,
                  "song_id": song.id,
                  "song_number": playlist.songIds.length + 1
              }));
               }}>{playlist.title }</h3>
                   
                 </div>
               </li>
             )}
           </>
          }) }
          </>
      )}
  </ul>
    )
}
  return (
    <>
      {song.id !== currentSong?.id && (
        <tr
          onMouseEnter={() => {
            setNumberPlay(playSymbol());
          }}
          onMouseLeave={() => {
            setNumberPlay(song.number);
          }}
          >
          <td style={greenText} onClick={handleTrackClick}>
            {numberPlay}
          </td>
          <td>
            <ul>
              <li style={greenText}>{song.title}</li>
              <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
            </ul>
          </td>
          <td><HeartSymbol liked={liked} onClick={handleClick} /></td>
          {/* <td>{formatTime(song.length)}</td> */}
          <td onClick={() => {setHiddenUlHidden(!hiddenUlHidden)}}><i id="add-button">ADD</i>{ hiddenUlHidden ? "" : hiddenUl()}</td>
        </tr>
      )}
      {song.id === currentSong?.id && (
        <tr
          onMouseEnter={() => {
            setNumberPlay(pauseSymbol());
            // setHeart(HeartSymbol());
            setEllipsis(ellipsisSymbol());
          }}
          onMouseLeave={() => {
            setNumberPlay(playSymbol());
            // setHeart("");
            setEllipsis(invisibleEllipsisSymbol());
          }}>
          <td style={greenText} onClick={handleTrackClick}>{numberPlay}</td>
          <td>
            <ul>
              <li style={greenText}>{song.title}</li>
              <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
            </ul>
          </td>
          <td><HeartSymbol liked={liked} onClick={handleClick} /></td>
          {/* <td>{formatTime(song.length)}</td> */}
          <td onClick={() => {setHiddenUlHidden(!hiddenUlHidden)}}><i id="add-button">ADD</i>{ hiddenUlHidden ? "" : hiddenUl()}</td>
        </tr>
      )}
    </>
  )
}
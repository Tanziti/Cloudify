import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import { formatTime } from "../../Artist";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylists } from "../../../../store/playlists";



const playSymbol = () => {
  return <i className="fa-solid fa-play" style={{ color: "#FFFFFF" }}></i>;
}
const heartSymbol = () => {
  return <Link to="/"><i className="fa-regular fa-heart" style={{ fontSize: "16px" }}></i></Link>;
}
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

  let currentSong = sessionUser?.queue?.[1]?.[0]
  console.log()

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
            {/* <li>Add to queue</li>
            <hr /> */}
            <li>Add to playlist</li>
        </ul>
    )
}
  return (
    <>
      {song.id !== currentSong?.id && (
        <tr
          onMouseEnter={() => {
            setNumberPlay(playSymbol());
            setHeart(heartSymbol());
            setEllipsis(ellipsisSymbol());
          }}
          onMouseLeave={() => {
            setNumberPlay(song.number);
            setHeart("");
            setEllipsis(invisibleEllipsisSymbol());
          }}>
          <td style={greenText} onClick={handleTrackClick}>
            {numberPlay}
          </td>
          <td>
            <ul>
              <li style={greenText}>{song.title}</li>
              <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
            </ul>
          </td>
          <td>{heart}</td>
          {/* <td>{formatTime(song.length)}</td> */}
          <td onClick={() => {setHiddenUlHidden(!hiddenUlHidden)}}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
        </tr>
      )}
      {song.id === currentSong?.id && (
        <tr
          onMouseEnter={() => {
            setNumberPlay(pauseSymbol());
            setHeart(heartSymbol());
            setEllipsis(ellipsisSymbol());
          }}
          onMouseLeave={() => {
            setNumberPlay(spinningDiscSymbol());
            setHeart("");
            setEllipsis(invisibleEllipsisSymbol());
          }}>
          <td style={greenText} onClick={handleTrackClick}>{numberPlay}</td>
          <td>
            <ul>
              <li style={greenText}>{song.title}</li>
              <li><Link to={`/artists/${artist.id}`}>{artist.name}</Link></li>
            </ul>
          </td>
          <td>{heart}</td>
          {/* <td>{formatTime(song.length)}</td> */}
          <td onClick={optionsButtonClick}>{ellipsis} {showOptionsMenu && (
                <ul className="playlist-options-dropdown">
                    <li>
                        <button className="delete-playlist-button" >Delete</button>
                    </li>
                </ul>
            )}</td>
        </tr>
      )}
    </>
  )
}
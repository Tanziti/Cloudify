import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { deletePlaylistSong, createPlaylistSong } from "../../../../store/playlistSongs";
// import { formatTime } from "../../AFfo
import { getPlaylists } from "../../../../store/playlists";



const playSymbol = () => {
    return <i className="fa-solid fa-play" style={{color: "#FFFFFF"}}></i>;
}
// const heartSymbol = () => {
//     return <Link to="/"><i className="fa-regular fa-heart" style={{fontSize: "16px"}}></i></Link>;
// }
const HeartSymbol = ({ liked, onClick }) => {
    const heartClass = liked ? "fa-solid fa-heart green" : "fa-regular fa-heart";
  
    return (
      <i className={heartClass} style={{ fontSize: "16px" }} onClick={onClick}></i>
    );
  };
const pauseSymbol = () => {
    return <i className="fa-solid fa-pause" style={{color: "#FFFFFF"}}></i>;
}
const spinningDiscSymbol = () => {
    return <i className="fa-solid fa-compact-disc fa-spin"></i>;
}
const ellipsisSymbol = () => {
    return <i className="fa-solid fa-ellipsis" style={{color: "#FFFFFF"}}></i>;
}
const invisibleEllipsisSymbol = () => {
    return <i className="fa-solid fa-ellipsis" style={{opacity: 0}}></i>;
}



export default function PlaylistSongIndex ({song,songsForQueue}) {
    const [numberPlay, setNumberPlay] = useState(song.songNumber);
    const [heart, setHeart] = useState("");
    const [ellipsis,setEllipsis] = useState(invisibleEllipsisSymbol());
    const sessionUser = useSelector(state => state.session.user);
    const [greenText,setGreenText] = useState({color: "#FFFFFF"});
    const [hiddenUlHidden, setHiddenUlHidden] = useState(true);
    const dispatch = useDispatch();
    const playlists = useSelector(getPlaylists);
    const likedSongsPlaylist = Object.values(playlists)[0];
    const [rowWidth,setRowWidth] = useState();

    const tableRowRef = useRef();
   
    const [liked, setLiked] = useState(() => {
        // debugger
        if (likedSongsPlaylist?.songIds?.length > 0) {
            return likedSongsPlaylist.songIds.some((playlistSong) => {
            //   debugger
              return playlistSong === song.songId;
            });
          }
          return false; // default value when songIds array is not available or empty
        });
      const handleClick = () => {
        // debugger
        if (!liked){
          setLiked(true)
        //   dispatch(createPlaylistSong({
        //     playlist_id: likedSongsPlaylist.id,
        //     song_id: song.id,
        //     // song_number: likedSongsPlaylist.songIds.length + 1  
        //   }))
        } 
        // else {
        //   setLiked(false)
        //   dispatch(deletePlaylistSong())
        // }
      };
    useEffect(() => {
        const getRowWidth = () => {
            if (tableRowRef.current) {
                const {width} = tableRowRef.current.getBoundingClientRect();
                setRowWidth(width);
            }
        };
        getRowWidth();
        window.addEventListener('resize', getRowWidth);
        return () => window.removeEventListener('resize', getRowWidth);
    }, [])

    let currentSong = sessionUser?.queue?.[0]?.[0]

    useEffect(() => {
        const audio = document.querySelector("audio");
        currentSong = sessionUser?.queue?.[0]?.[0]
        if (song.id === currentSong?.id) {
            setGreenText({color: "#1ED760"})
        } else {
            setGreenText({color: "#FFFFFF"})
        }
    }, [sessionUser?.queue?.[0]])

    useEffect(() => {}, [hiddenUlHidden])

    const handleTrackClick = () => {
        // debugger
        if (sessionUser) {
            if (song.id !== currentSong?.id) {
                sessionUser.queue = songsForQueue;
                const audio = document.querySelector("audio");
                audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0;
            }
            document.querySelector(".playPause").click()
        }
    }

    const hiddenUl = () => {
        return (
          <ul className="hiddenUl">
            <li onClick={() => dispatch(deletePlaylistSong(song.id))}>Remove from this playlist</li>
          </ul>
        );
      };

    // const displayNumberPlay = () => {
    //     if (song.id === currentSong?.id) {
    //         const audio = document.querySelector("audio");
    //         if (audio.paused) {
    //             return numberPlay;
    //         } else {
    //             return spinningDiscSymbol();
    //         }
    //     } else {
    //         return numberPlay;
    //     }
    // }


    return (
        <>
        { song.id !== currentSong?.id && (
            <tr ref={tableRowRef}
                onMouseEnter={() => {
                    setNumberPlay(playSymbol());
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setNumberPlay(song.songNumber);
                    setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={greenText} onClick={handleTrackClick}>
                    {numberPlay}
                </td>
                <td>
                    <div className="playlistImageColumn">
                            <img src={song.imageUrl}></img>
                        <ul>
                            <li style={greenText}>{song.title}</li>
                            <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                        </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                {/* <td hidden={ rowWidth < 710 ? "hidden" : ""} >
{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td> */}
                {/* <td><HeartSymbol liked={liked} onClick={handleClick} /></td> */}
                {/* <td>{formatTime(song.length)}</td> */}
                <td onClick={() => {setHiddenUlHidden(!hiddenUlHidden)}}>{ellipsis}{ hiddenUlHidden ? "" : hiddenUl()}</td>
            </tr>
        )}
        {song.id === currentSong?.id && (
            <tr ref={tableRowRef}
                onMouseEnter={() => {
                    setNumberPlay(pauseSymbol());
                  
                    setEllipsis(ellipsisSymbol());
                }}
                onMouseLeave={() => {
                    setNumberPlay(spinningDiscSymbol());
                
                    setEllipsis(invisibleEllipsisSymbol());
                }}>
                <td style={greenText} onClick={() => {
                        document.querySelector(".playPause").click()
                    }}>{numberPlay}</td>
                <td>
                    <div className="playlistImageColumn">
                        <img src={song.imageUrl}></img>
                    <ul>
                        <li style={greenText}>{song.title}</li>
                        <li><Link to={`/artists/${song.artistId}`}>{song.artistName}</Link></li>
                    </ul>
                    </div>
                </td>
                <td hidden={ rowWidth < 500 ? "hidden" : ""} ><Link to={`/albums/${song.albumId}`}>{song.albumTitle}</Link></td>
                {/* <td hidden={ rowWidth < 710 ? "hidden" : ""} >
{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format((new Date(song.createdAt)))}</td> */}
                 {/* <td><HeartSymbol liked={liked} onClick={handleClick} /></td> */}
                {/* <td>{formatTime(song.length)}</td> */}
                <td>{ellipsis}</td>
            </tr>
        )}
        </>
    )
}
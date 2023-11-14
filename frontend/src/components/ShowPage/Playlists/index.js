import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './Playlist.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist, getPlaylist, getPlaylists, createPlaylist, deletePlaylist } from "../../../store/playlists";
import { useEffect, useRef, useState } from "react";
import { getSongs } from "../../../store/songs";
import { getArtist } from "../../../store/artists";
import PlaylistSongIndex from "./PlaylistSongIndex";
import { invisibleEllipsisSymbol } from "../Albums/SongIndex";
import { getPlaylistSongs } from "../../../store/playlistSongs";
import { updatePlaylist } from "../../../store/playlists";

export default function PlaylistShow() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {playlistId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [rowWidth,setRowWidth] = useState();
    const playlist = useSelector(getPlaylist(playlistId));
    const playlistSongs = useSelector(getPlaylistSongs)
    const tableRowRef = useRef();
    const [playlistTitle, setPlaylistTitle] = useState("")
    const editInput = useRef(false);
  
    useEffect(() => {
        if (playlist?.title){
            setPlaylistTitle(playlist.title)
        }
    }, [playlist?.title])
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

    useEffect(()=> {
        dispatch(fetchPlaylist(playlistId));
     
    },[dispatch, playlistId])
    useEffect(()=> {
        debugger
        dispatch(fetchPlaylist(playlistId));
    },[])

    
    let currentSong = sessionUser?.queue[0]?.[0]

    useEffect(() => {
        currentSong = sessionUser?.queue[0]?.[0]
    }, [sessionUser])

  
    const handleTitleSubmit = (e) => {
        e.preventDefault();
        debugger
        dispatch(updatePlaylist({
            "id": playlist.id,
            "title": playlistTitle,
            "user_id": sessionUser.id
        }))
        editInput.current.blur();
        return (history.push(`/playlists/${playlist.id}`));
    }
  
    let opaqueBkgdStyle = {};

    useEffect(() => {
        if (playlist) {
            opaqueBkgdStyle = {
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }
        }
    }, [playlist])


    let runtime = 0;

    // Object.values(playlist).forEach(playlist => runtime += playlist.length)

    const formatRuntime = (runtime) => {
        const min = Math.floor(runtime / 60);
        const sec = runtime % 60;
        return `${min} min ${sec} sec`
    }

  

    const songsForTracklist = Object.values(playlistSongs)
        .sort((a,b) => a.songNumber - b.songNumber)

    const songsForQueue = songsForTracklist
        .map(song => [song,0])

    // for (let i = 0; i < songsForQueue.length; i++) {
    //     songsForQueue[i][0].artistName = artist.name;
    //     songsForQueue[i][0].artistId = artist.id;
    //     songsForQueue[i][0].imageUrl = album.imageUrl;
    // }
    const handleDeletePlaylist = (e) => {
        e.preventDefault();
        dispatch(deletePlaylist(playlistId));
        history.push(`/`);
    }

    // const handleDeletePlaylist = () => {
    //     dispatch(deletePlaylist(playlistId))
    // }
    
    return (
        <>
            {playlist && Object.keys(playlist).length > 0
                && (
                    <>
            <div className="playlistShowTop">
                <div className="playlistImage">
                    <img src={playlist.imageUrl}></img>
                </div>
                <div className='playlistHeaders'>
                    <h4>Playlist</h4>
                    <div className='playlist-text'>
                    {playlist.title !== "Liked Songs" ? (
  <form onSubmit={handleTitleSubmit}>
    <p className='playlist-title'>
      <input
        className='playlist-title-input'
        type='text'
        value={playlistTitle}
        onChange={(e) => setPlaylistTitle(e.target.value)}
        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
        ref={editInput}
      />
    </p>
  </form>
) : (
  <h1 className='playlist-title'>{playlistTitle}</h1>
)}
                </div>
                  {playlist.title !== "Liked Songs" ?  <button onClick={handleDeletePlaylist}>delete playlist</button>: <></>}
                    {/* <button onClick={handleDeletePlaylist}>delete playlist</button> */}
                    <h5>
                        <Link to="" onClick={(e) => {e.preventDefault()}}>{playlist.userName}</Link>
                        {/* &nbsp;· {playlist.playlistSongIds.length} song{ playlist.playlistSongIds.length === 1 ? "" : "s" },
                        &nbsp; <span className="playlistLength">{formatRuntime(runtime)}</span> */}

                    </h5>
                </div>
            </div>
            <div className='opaqueBkgd-2' style={{
                backgroundImage: `linear-gradient(to bottom, ${playlist.color}, rgba(18, 18, 18, 1))`
            }}>
                <div className='playlistTrackList'>
                <span className="bigButtons">
                    <button className="bigPlay" onClick={() => {
                    if (sessionUser) {
                        sessionUser.queue = songsForQueue
                        const audio = document.querySelector("audio")
                        audio.currentTime = sessionUser.queue?.[0]?.[1] ? sessionUser.queue[0][1] : 0
                        
                        if (audio.paused) {
                            document.querySelector(".playPause").click()
                        }
                    }
                    }}>{ currentSong?.playlistId === playlistId ?
                    (<i className="fa-solid fa-pause"></i>) :
                    (<i className="fa-solid fa-play"></i>)}</button>
                    {/* <span className="bigHeart"><i className="fa-regular fa-heart"></i></span>
                    <span className="bigDots"><i className="fa-solid fa-ellipsis"></i></span> */}
                </span>

                    <table>
                        <tr ref={tableRowRef}>
                            <td>#</td>
                            <td className="titleColumn">
                                Title
                            </td>
                            <td className="albumColumn"  hidden={ rowWidth < 500 ? "hidden" : ""} >
                                Album
                            </td>
                            <td className="dateAddedColumn" hidden={ rowWidth < 710 ? "hidden" : ""} >
                                ...
                            </td>
                            <td></td>
                            <td><i className="fa-regular fa-clock"></i></td>
                            <td>{invisibleEllipsisSymbol()}</td>
                        </tr>
                        <hr></hr>
                        {songsForTracklist.map(song => {
                        
                            return (
                                
                                <PlaylistSongIndex
                                    song={song}
                                    songsForQueue={songsForQueue.filter(entry => entry[0].songNumber >= song.songNumber)} 
                                    />
                            )
                        })}

                    </table>

                </div>
            </div>
            </>

            )}
        </>
    )
}
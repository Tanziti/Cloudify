import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS } from "../../store/search";

export default function Search() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const [query,setQuery] = useState(params.get("query"));
    const searchResults = useSelector(state => state.search)

    if (!query) {
        return (
            <div className="emptySearchMessage">
                <h1>Please enter a search query to find results.</h1>
            </div>
        );
    }
  
    return (
        <div className="searchGrid" style={{paddingTop: '66px'}}>
        {searchResults.songs && Object.values(searchResults.songs).map(song => {
            return (
                <ul onClick={()=> {history.push(`/albums/${song.albumId}`)}}>
                    <div> Songs

                    <li>{ song.imageUrl ? (
                        <img src={`${song.imageUrl}`}></img>
                    ) : (
                        <div className="imageStandIn" style={{backgroundColor: "#121212"}}></div>
                    )}
                    </li>
                    <li className="songTitle">{song.title}</li>

                    </div>
                    <div>

                    <li className="songArtistName">Song</li>
                    <li className="songArtistName fourth">{song.artistName}</li>
                    </div>
                </ul>
            )
        })}
         {searchResults.albums && Object.values(searchResults.albums).map(album => {
                    return (
                        
                        <ul onClick={()=> {history.push(`/albums/${album.id}`)}}>
                            <div> 
                            <li>{ album.imageUrl ? (
                                <img src={`${album.imageUrl}`}></img>
                            ) : (
                                <div className="imageStandIn" style={{backgroundColor: `${album.color}`}}></div>
                            )}
                            </li>
                            <li className="albumTitle">{album.name}</li>
                            </div>
                            <div>
                            <li className="albumArtistName">Album</li>
                            <li className="albumArtistName fourth">{album.artistName}</li>
                            </div>
                        </ul>
                    )
                })}
            {searchResults.artists && Object.values(searchResults.artists).map(artist => {
                    return (
                        <ul onClick={()=> {history.push(`/artists/${artist.id}`)}}>
                            <div>
                            <li>{ artist.imageUrl ? (
                                <img src={`${artist.imageUrl}`}></img>
                            ) : (
                                <div className="imageStandIn" style={{backgroundColor: "#121212"}}></div>
                            )}
                            </li>
                            <li className="artistName">{artist.name}</li>
                            </div>
                            <div></div>
                            {/* <li className="playlistUserName">{playlist.userName}</li> */}
                        </ul>
                        )
                })}

        </div>

    )
}
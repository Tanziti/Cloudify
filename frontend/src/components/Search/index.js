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

    debugger
    return (
        <div className="searchGrid" style={{paddingTop: '66px'}}>
        {searchResults && Object.values(searchResults).map(song => {
            return (
                <ul onClick={()=> {history.push(`/albums/${song.albumId}`)}}>
                    <div>

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
        </div>

    )
}
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Library.css"
import LibraryIndex from "./LibraryIndex";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists, getPlaylists } from "../../../store/playlists";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import "../LibraryNav/LibraryNav.css"
import { createPlaylist } from "../../../store/playlists";

export default function Library() {
    const history = useHistory();
    const dispatch = useDispatch();

    const playlists  = useSelector(getPlaylists);
    const session = useSelector(state => state.session ? state.session : {});
    // debugger
    useEffect(() => {
        dispatch(fetchPlaylists());
    },[dispatch, playlists])

    const handleCreatePlaylist = () => {
        // debugger
        if (!session.user) {
            history.push(`/login`);
        };

        dispatch(createPlaylist({
                "title": `My Playlist #${Object.keys(playlists).length + 1}`,
                "user_id": session.user.id,
                "public": true,
                "color": "#112222"
        }))
        debugger
        // history.push(`/playlists/${playlists.length + 1}`);
    };
    return (
        <div className="library">
             <div className="libraryNavigation">
            <div className='firstLine'>
                <span>
                <NavLink to="">
                    <span className='fa-solid'><i className="fa-solid fa-lines-leaning"></i></span>
                    <span className='yourLibrary'> Your Library</span>
                </NavLink>
                </span>
                <span>
                <span onClick={handleCreatePlaylist}className='fa-solid circle'><i className="fa-solid fa-plus"></i></span>
                <NavLink to=""><span className='fa-solid circle'><i className="fa-solid fa-arrow-right"></i></span></NavLink>
                </span>
            </div>
            </div>
            <ul>
                { playlists && (
                    <>
                    { Object.values(playlists).map(playlist => {
                       return <LibraryIndex playlist={playlist} album={null} />
                    }) }
                    </>
                )}
            </ul>
        </div>
    )
}
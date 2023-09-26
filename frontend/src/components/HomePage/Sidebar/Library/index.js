// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import "./Library.css"
// import LibraryIndex from "./LibraryIndex";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPlaylists, getPlaylists } from "../../../store/playlists";
// import { useEffect } from "react";

// export default function Library() {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const { playlists } = useSelector(getPlaylists);

//   useEffect(() => {
//     dispatch(fetchPlaylists());
//   }, [])

//   return (
//     <div className="library">
//       <ul>
//         {playlists && (
//           <>
//             {Object.values(playlists).map(playlist => {
//               return <LibraryIndex playlist={playlist} album={null} />
//             })}
//           </>
//         )}
//       </ul>
//     </div>
//   )
// }
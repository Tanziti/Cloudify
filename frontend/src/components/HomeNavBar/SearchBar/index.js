// import { useState } from "react"
// import { clearSearchResults, fetchSearchResults } from "../../../store/search";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

// function SearchBar() {
//   const [searchText, setSearchText] = useState("");
//   const dispatch = useDispatch();
//   const searchResults = useSelector(state => Object.values(state.search))
//   const history = useHistory();


//   function handleChange(e) {
//     const query = e.target.value;
//     setSearchText(query);
//     if (query.trim() !== "") {
//       dispatch(fetchSearchResults(query))
//     } else {
//       dispatch(clearSearchResults())
//     }
//   }

//   function handleClickLink(id) {
//     return (e) => {
//       e.preventDefault();
//       history.push(`/songs/${id}`)
//       dispatch(clearSearchResults());
//       setSearchText("");
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     if (searchText.trim !== "") {
//       setSearchText("");
//       history.push(`/search?query=${searchText}`)
//     }
//   }

//   return (
//     <div className="searchbar-container">
//       <input
//         type="text"
//         id="search-input"
//         placeholder="search for a song"
//         value={searchText}
//         onChange={handleChange}
//       ></input>
//       <button>search</button>

//       {searchText &&
//         <ul>
//           {searchResults.map(result => {
//             return (
//               <li key={result.id} onClick={handleClickLink(result.id)} className="search-dropdown-item">
//                 {result.title || result.name}
//               </li>
//             )
//           })} </ul>}
//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import { clearSearchResults, fetchSearchResults } from "../../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchText, setSearchText] = useState();
  const [timer, setTimer] = useState("");

  const searchResults = useSelector(state => state.search)


  useEffect(() => {
    dispatch(clearSearchResults());
  }, [])
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    clearTimeout(timer);

    if (query.trim() !== "") {
      // const newTimer = setTimeout(() => dispatch(fetchSearchResults(query)), 300);
      const newTimer = setTimeout(() => history.push({pathname: '/search', search: `?query=${query}`}))
      setTimer(newTimer);
    } else {
      dispatch(clearSearchResults());
    }
  }

  return (
    <span className="searchBarContainer">
      <input
        type="text"
        id="searchInput"
        name="search"
        placeholder="What do you want to listen to?"
        value={searchText}
        onKeyDown={(e) => {
          if (e.keyCode === 32) {
            e.stopPropagation();
          }
        }}
        onChange={handleSearch}></input>
      <i className="fa-solid fa-magnifying-glass"></i>

    </span>
  )
}


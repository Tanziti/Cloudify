import { useState } from "react"
import { clearSearchResults, fetchSearchResults } from "../../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(state => Object.values(state.search))
  const history = useHistory();


  function handleChange(e) {
    const query = e.target.value;
    setSearchText(query);
    if (query.trim() !== "") {
      dispatch(fetchSearchResults(query))
    } else {
      dispatch(clearSearchResults())
    }
  }

  function handleClickLink(id) {
    return (e) => {
      e.preventDefault();
      history.push(`/songs/${id}`)
      dispatch(clearSearchResults());
      setSearchText("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (searchText.trim !== "") {
      setSearchText("");
      history.push(`/search?query=${searchText}`)
    }
  }

  return (
    <div className="searchbar-container">
      <input
        type="text"
        id="search-input"
        placeholder="search for a song"
        value={searchText}
        onChange={handleChange}
      ></input>
      <button>search</button>

      {searchText &&
        <ul>
          {searchResults.map(result => {
            return (
              <li key={result.id} onClick={handleClickLink(result.id)} className="search-dropdown-item">
                {result.title || result.name}
              </li>
            )
          })} </ul>}
    </div>
  )
}
export default SearchBar
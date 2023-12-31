import "./Sidebar.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import Library from "./Library"



export default function Sidebar() {


  return (
    <>
      <div className="homeAndSearch">
        <ul>
          <li>
            <NavLink to="/">
              <span className="fa-solid">
                <i className="fa-solid fa-house"></i>
              </span>
              <span className="home">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <span className="fa-solid"><i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <span className="search">Search</span>
            </NavLink>
          </li>
        </ul>

      </div>
    
      <Library />

    </>
  )
}
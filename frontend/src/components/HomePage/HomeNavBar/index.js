import './HomeNavBar.css'
import { Link, NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import { useEffect, useState } from "react";

export default function HomeNavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [opacityStyle, setOpacityStyle] = useState({
    backgroundColor: "rgba(18, 18, 18, 0)",
    opacity: .8
  });

  useEffect(() => {
    const setOpacity = (homeWindow) => () => {
      const scrollTop = homeWindow.scrollTop;
      if (scrollTop > 340) {
        setOpacityStyle({
          backgroundColor: "rgba(18, 18, 18, 1)",
          opacity: 1
        })
      } else {
        const newBkgdOpacity = scrollTop / 340;
        const newOpacity = .8 + (.2 * newBkgdOpacity)
        setOpacityStyle({
          backgroundColor: `rgba(18, 18, 18, ${newBkgdOpacity})`,
          opacity: newOpacity
        })
      }
    }
    const homeWindow = document.querySelector("div.home")
    if (homeWindow) {
      homeWindow.addEventListener("scroll", setOpacity(homeWindow));
    }
    return () => {
      if (homeWindow) {
        homeWindow.removeEventListener("scroll", setOpacity(homeWindow));
      }
    }
  })


  return (
    <div className="homeNav" style={sessionUser ? opacityStyle : { backgroundColor: "rgba(18, 18, 18, 1)", opacity: 1 }}>
      {!sessionStorage["currentUser"] && (
        <>
          <span>
            <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-left"></i></button>
            <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-right"></i></button>
          </span>
          <span>
            <button className="looseLinks">Premium</button>
            <button className="looseLinks">Support</button>
            <button className="looseLinks">Download</button>
            <button className="vl"></button>
            <button className="signUp" onClick={() => { history.push("/signup") }}>Sign up</button>
            <button className="logIn" onClick={() => { history.push("/login") }}>Log in</button>
          </span>
        </>
      )}
      {sessionUser && (
        <>
          <span>
            <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-left"></i></button>
            <button className="fa-solid circle loggedOut"><i class="fa-solid fa-chevron-right"></i></button>
            {/* {searching && (<SearchBar />)} */}
          </span>

          <span>
            <button className="installApp"><i class="fa-regular fa-circle-down"></i> Install App</button>
            <button className="profile" onClick={(e) => { e.preventDefault(); dispatch(logout()); }}><i className="fa-solid fa-user-circle" /></button>
          </span>
        </>
      )}
    </div>

  )
}
